import type { AvailableLanguageTag } from "../../lib/paraglide/runtime"
import type { ParaglideLocals } from "@inlang/paraglide-sveltekit"
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface PageData {
      flash?: { status: 'success' | 'error'; text: string };
    }
    // interface PageState {}
    // interface Platform {}
    interface Locals {
      paraglide: ParaglideLocals<AvailableLanguageTag>,
      user: import('lucia').User | null;
      session: import('lucia').Session | null;
      theme: "light" | "dark"
    }
  }
}

export { };
