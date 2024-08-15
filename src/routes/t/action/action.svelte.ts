import { deserialize } from "$app/forms";
import { onMount } from "svelte"

export const useAction = <T extends (...args: any) => Promise<any>>(action: string) => {
  let value = $state<ReturnType<T>>(new Promise((resolve, reject) => { } ) as any)

  const callAction = async () => {
    let formData = new FormData();
    let response = await fetch(`?/${action}`, { method: 'POST', body: formData });
    let currentResult = deserialize(await response.text()) as any;
    return (currentResult?.data || {});
  }

  onMount(() => {
    (async () => {
      value = callAction() as any
    })();
  });

  
  return {
    get value() {
      return value;
    }
  }
}