// Legacy storage keys and URLs stay stable; module names use their short form.
export const moduleLabel=value=>String(value??'').replace(/\bLU-([A-Z]\d{3})\b/g,'$1');
export const shortModuleHtml=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]*>|[^<]+/gi,part=>part.startsWith('<')?part:moduleLabel(part));
