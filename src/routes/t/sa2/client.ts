
import type { actions } from "./actions";
import { clientHandler } from "./lib/clientHandler";

export let client = clientHandler<typeof actions>();