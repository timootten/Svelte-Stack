
import { goto, replaceState } from '$app/navigation';
import { compressSync, decompressSync } from '$lib/utils/gzip';
import type { Page } from '@sveltejs/kit';

export const useURLParams = <T extends Record<string, any>>(
  defaultValue: T,
  page: Page<Record<string, string>, string | null>,
  options?: { compress?: boolean, param?: string }
): T => {
  const { compress = false } = options || {};
  let hash = options?.param ? page.params[options.param] : page.url.searchParams.get('d');

  try {
    if (hash) {
      if (compress) {
        defaultValue = JSON.parse(decompressSync(hash));
      } else {
        defaultValue = JSON.parse(atob(hash));
      }
    }
  } catch (error) {

  }
  let values: T = $state<T>(defaultValue);

  return new Proxy(values as T, {
    get: (target, key) => {
      if (typeof key === 'string' && key in values) {
        return target[key as keyof T]; // Add an index signature to access the values object
      }
      return '';
    },
    set: (target, key, value) => {
      if (typeof key === 'string' && key in values) {
        target[key as keyof T] = value; // Add an index signature to access the values object
        let updatedHash = "";
        if (compress) {
          updatedHash = compressSync(JSON.stringify(target));
        } else {
          updatedHash = btoa(JSON.stringify(target));
        }
        if (options?.param) {
          const url = page.route.id?.replace(`[${options?.param}]`, updatedHash);
          const query = decodeURIComponent(page.url.searchParams.toString());
          const queryString = query ? `?${query}` : '';
          replaceState(`${url}${queryString}`, history.state);
        } else {
          let query = new URLSearchParams(page.url.searchParams.toString());
          query.set('d', updatedHash);
          console.log(decodeURIComponent(query.toString()));
          replaceState(`?${decodeURIComponent(query.toString())}`, history.state);
        }
        return true;
      }
      return false;
    }
  });
};