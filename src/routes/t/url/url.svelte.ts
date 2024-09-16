
import { replaceState } from '$app/navigation';
import { compressSync, decompressSync } from '$lib/utils/gzip';

export const useURLParams = <T extends Record<string, any>>(
  defaultValue: T,
  url: URL = new URL(window.location.href),
  options?: { compress?: boolean }
): T => {
  const { compress = false } = options || {};
  let hash = url.searchParams.get('d');

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
        let text = "";
        if (compress) {
          text = compressSync(JSON.stringify(target));
        } else {
          text = btoa(JSON.stringify(target));
        }
        let query = new URLSearchParams(url.searchParams.toString());
        query.set('d', text);
        console.log(decodeURIComponent(query.toString()));
        replaceState(`?${decodeURIComponent(query.toString())}`, history.state);
        return true;
      }
      return false;
    }
  });
};