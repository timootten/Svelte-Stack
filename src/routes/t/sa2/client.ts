
import type { actions } from "./lib/actions";
import { clientHandler } from "./lib/clientHandler";

export let client = clientHandler<typeof actions>();