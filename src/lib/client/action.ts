import { deserialize } from "$app/forms";


import { fail, type ActionFailure as ActionFailureType } from "@sveltejs/kit"

interface Class<T> extends Function {
  new(...args: any[]): T
}

export const ActionFailure = fail(Infinity).constructor as unknown as Class<ActionFailureType>

export const useAction = <T extends (...args: any) => Promise<any>>(action: string) => {

  const callAction = async () => {
    let formData = new FormData();
    let response = await fetch(`?/${action}`, { method: 'POST', body: formData });
    let currentResult = deserialize(await response.text()) as any;
    return (currentResult?.data || {});
  }

  return callAction() as ReturnType<T>
}