import type { Handle } from "@sveltejs/kit";

export const themeHandler: Handle = async ({ event, resolve }) => {
  let theme: "light" | "dark" = event.cookies.get('theme') === 'light' ? 'light' : 'dark'

  console.log("theme", theme)

  event.locals.theme = theme;

  return await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace('%theme%', theme)
    },
  });
}