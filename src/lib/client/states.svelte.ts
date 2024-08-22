import { browser } from "$app/environment";

export const theme: { value: "dark" | "light" } = $state({
  value: (() => {
    if (browser) {
      return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
    }
    return "dark"
  })()
})