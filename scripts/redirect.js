/**
 * By upgrading to Docusaurus v2, new URL format is /docs/article for default language
 * (English in our case), and /<lang>/docs/article for the others.
 *
 * This function will create a mapping function which is fed to docusaurus redirect plugin.
 * The mapping function will be preprocessed. It receives the existing paths and returns
 * the possible old paths. It's quite converse !!
 *
 * Example:
 * const redirecter = redirect(["zh-CN", "ru"];
 * redirecter("/zh-CN/docs/ABC") -> "/docs/zh-CN/ABC"
 * redirecter("/docs/DEF") -> "/docs/en/DEF"
 */

const redirect = (supportedLanguages) => (existingPath) => {
  for (const lang of supportedLanguages) {
    const regexp = new RegExp(`^\/${lang}\/docs\/(?<article>.*)$`);
    const match = regexp.exec(existingPath);
    if (match) {
      return `/docs/${lang}/${match.groups.article}`;
    }
  }

  const NEW_ENGLISH_URL = /^\/docs\/(?!en\/)(?<article>.*)$/;
  const match = NEW_ENGLISH_URL.exec(existingPath);
  if (match) {
    return `/docs/en/${match.groups.article}`;
  }
};
