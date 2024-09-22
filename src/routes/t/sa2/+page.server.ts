import { getUser } from '../../../lib/server/actions.js';
import { actions } from './client.js';


export async function load(event) {

  const test = await actions.test({ message: 'Hello World' }, { test: 'test' });



  return { test }
}