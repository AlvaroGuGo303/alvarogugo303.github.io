// Formato inline mínimo para los textos de traducción (i18n/ui.ts).
// Permite escribir, DESDE el propio texto:
//   **negrita**           -> <strong>
//   *cursiva*             -> <em>
//   `código`              -> <code>
//   [texto](https://…)    -> <a>  (solo http/https)
// Se escapa el HTML primero, así que el texto es seguro y solo se interpretan
// estos marcadores. Úsalo con set:html:  <p set:html={inline(texto)} />
export function inline(input: string): string {
	if (!input) return '';
	let out = input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	// Placeholders para no pisar el interior de los enlaces con negrita/código
	const slots: string[] = [];
	const park = (html: string) => {
		slots.push(html);
		return `\u0000${slots.length - 1}\u0000`;
	};

	// [texto](https://…) — solo http/https
	out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_m, label: string, url: string) =>
		park(
			`<a href="${url}" target="_blank" rel="noopener noreferrer" class="font-semibold text-accent dark:text-accent-hot underline-offset-2 hover:underline">${label}</a>`
		)
	);

	// `código`
	out = out.replace(
		/`([^`]+)`/g,
		'<code class="font-mono text-[0.85em] px-1 py-0.5 rounded bg-accent/10 text-accent dark:text-accent-hot">$1</code>'
	);
	// **negrita** (antes que la cursiva) — tono intermedio, no blanco puro
	out = out.replace(
		/\*\*([^*]+)\*\*/g,
		'<strong class="font-semibold text-[#333b45] dark:text-[#c8d0da]">$1</strong>'
	);
	// *cursiva*
	out = out.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

	// Restaurar enlaces (y permitir negrita/código dentro del label vía un 2º pase ligero)
	out = out.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => {
		let html = slots[Number(i)];
		html = html.replace(
			/\*\*([^*]+)\*\*/g,
			'<strong class="font-semibold">$1</strong>'
		);
		html = html.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
		return html;
	});

	return out;
}
