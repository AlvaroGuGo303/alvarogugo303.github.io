import type { APIRoute } from 'astro';

// Sitemap generado en build a partir de Astro.site (= SITE_URL en consts.ts),
// así sigue al dominio automáticamente. Para añadir una página al sitemap,
// añade su ruta (sin locale) a PAGES: se emite en cada idioma con hreflang.
const LOCALES = ['es', 'en'] as const;
const DEFAULT_LOCALE = 'es';
const PAGES = ['']; // '' = home.

export const GET: APIRoute = ({ site }) => {
	const base = site!.href.replace(/\/$/, ''); // sin barra final

	const url = (loc: string, path: string) => `${base}/${loc}/${path}`.replace(/\/$/, '') + '/';

	const entries = PAGES.flatMap((path) =>
		LOCALES.map((loc) => {
			const alts = LOCALES.map(
				(l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, path)}"/>`
			).join('\n');
			return `  <url>
    <loc>${url(loc, path)}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(DEFAULT_LOCALE, path)}"/>
  </url>`;
		})
	).join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
