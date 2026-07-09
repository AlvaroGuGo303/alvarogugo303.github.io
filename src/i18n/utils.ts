import { ui, defaultLang } from "./ui";

// Idiomas soportados
export type SupportedLang = "es" | "en";

export function getLangFromUrl(url: URL): SupportedLang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as SupportedLang;
  return defaultLang;
}

// t(key) devuelve el tipo real del valor de esa clave (string, array de
// experiencia/proyectos, etc.), sin `any`: la KEY y el valor quedan tipados.
export function useTranslations(lang: SupportedLang) {
  return function t<K extends keyof (typeof ui)[typeof defaultLang]>(
    key: K
  ): (typeof ui)[typeof defaultLang][K] {
    return (ui[lang][key] ?? ui[defaultLang][key]) as (typeof ui)[typeof defaultLang][K];
  };
}
