import { deserialize } from "$app/forms";
import { onMount } from "svelte"

interface UsePollingOptions<T extends (...args: any) => Promise<any>> {
  action: string;
  interval: number;
  defaultValue: Awaited<ReturnType<T>>;
}

// Todo: Remove action and use the function name
// And make a copy and make a useAction

export const usePolling = <T extends (...args: any) => Promise<any>>(
  { action, interval, defaultValue }: UsePollingOptions<T>
) => {
  let value = $state<Awaited<ReturnType<T>>>(defaultValue);

  const poll = async () => {
    let formData = new FormData();
    let response = await fetch(`?/${action}`, { method: 'POST', body: formData });
    let currentResult = deserialize(await response.text()) as any;
    value = (currentResult?.data || {});
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

  return {
    get value() {
      return value
    }
  };
}

export let test = $state("XX")