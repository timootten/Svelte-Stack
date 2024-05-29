import { deserialize } from "$app/forms";
import { onMount } from "svelte"
import { writable, type Writable } from "svelte/store";

const usePolling = <T>({ action, interval, defaultValue }: { action: string, interval: number, defaultValue: Awaited<T> }): Writable<Awaited<T>> => {
  const result = writable<Awaited<T>>(defaultValue);
  const poll = async () => {
    let formData = new FormData();
    let response = await fetch(`?/${action}`, { method: 'POST', body: formData });
    let currentResult = deserialize(await response.text()) as any;
    result.set(currentResult?.data || {});
  }

  onMount(() => {
    (async () => {
      await poll();
    })();
    let intervalTimer = setInterval(async () => {
      await poll();
    }, interval);

    return () => clearInterval(intervalTimer);
  });

  return result;
}

export { usePolling }