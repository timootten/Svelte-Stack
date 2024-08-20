// file initialized by the Paraglide-SvelteKit CLI - Feel free to edit it
import { createI18n } from "@inlang/paraglide-sveltekit"
import * as runtime from "$lib/paraglide/runtime.js"
import Us from 'svelte-flag-icons/Us.svelte';
import De from 'svelte-flag-icons/De.svelte';

const i18n = createI18n(runtime)

export { i18n };

export type LOCALE = "en" | "de";

export const getLanguageName = (locale: LOCALE): string => {
  switch (locale) {
    case "en":
      return "English";
    case "de":
      return "German";
    default:
      return "Unknown Language";
  }
}

export const getLanguageFlag = (locale: LOCALE) => {
  switch (locale) {
    case "en":
      return Us;
    case "de":
      return De;
    default:
      return undefined;
  }
}