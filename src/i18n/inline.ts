// Formato inline mínimo para los textos de traducción (i18n/ui.ts).
// Permite escribir, DESDE el propio texto:
//   **negrita**      -> <strong>
//   *cursiva*        -> <em>
//   `código`         -> <code>
// Se escapa el HTML primero, así que el texto es seguro y solo se interpretan
// estos tres marcadores. Úsalo con set:html:  <p set:html={inline(texto)} />
export function inline(input: string): string {
	if (!input) return '';
	let out = input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

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

	return out;
}
