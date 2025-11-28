export function removeInlineStyles(html) {
  return html.replace(/style="[^"]*"/g, "");
}
