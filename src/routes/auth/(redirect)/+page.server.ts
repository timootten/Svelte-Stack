import { i18n } from '$lib/i18n';
import { redirect } from '@sveltejs/kit';

export function load() {
  throw redirect(307, i18n.resolveRoute('/auth/login'));
}