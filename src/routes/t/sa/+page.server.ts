import { getUser } from '../../../lib/server/actions.js';
import { actions } from './client.js';


export async function load({ }) {
  //let user = await getUser({ id: "123" });

  //console.log(user)

  const test = await actions.test({ message: 'Hello World' }, { test: 'test' });

  return { test }
}