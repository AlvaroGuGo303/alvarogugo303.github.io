# Porfolio · Álvaro Guillén González

Porfolio personal bilingüe (ES/EN) construido con **Astro 7** + **Tailwind CSS 4**.

Rediseño que combina lo mejor de tres bases:

- **Sistema visual y arquitectura** (tokens de color, `af-page-bg`/`af-card`, SEO
  completo, tema sin parpadeo, sitemap) heredados de la landing (repo3).
- **Orientación de porfolio y despliegue con GitHub Actions** heredados del
  porfolio base (Patricia).
- **Contenido íntegro** (experiencia, proyectos, iconos de tecnologías, i18n) del
  porfolio original de Álvaro (repo2).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321/es/
npm run build    # astro check + build a dist/
npm run preview
```

## Dónde se toca qué

| Quiero cambiar…                    | Archivo                                   |
| ---------------------------------- | ----------------------------------------- |
| Colores / marca                    | `src/styles/globals.css` (`:root`)        |
| Enlaces de contacto / redes / URL  | `src/consts.ts`                           |
| Textos (bio, experiencia, proyectos) | `src/i18n/ui.ts`                        |
| Analítica (PostHog, opcional)      | `.env` (ver `.env.example`)               |

## Despliegue

`.github/workflows/astro.yml` compila y publica en **GitHub Pages** en cada push
a `main` (pasa `--site`/`--base` automáticamente).
