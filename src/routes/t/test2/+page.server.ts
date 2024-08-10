import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils";
import { redirect } from '@sveltejs/kit';

export async function load({ locals, request, setHeaders }) {
 
  const takesLong = async () => {
    await sleep(5000)
    return { done: true }
  };

  return {
    
    x: {
       takesLong: takesLong()
    }
  };
}