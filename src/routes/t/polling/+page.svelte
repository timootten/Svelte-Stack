<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { actions } from './+page.server';
	import { usePolling } from './polling';

	export let data;
	export let form;

	const polling = usePolling<typeof actions.timePolling>({
		action: 'timePolling',
		interval: 1000,
		defaultValue: { time: data.time }
	});
</script>

<p>Data: {data.time}</p>
<p>Time: {$polling.time}</p>
<p>Time2: {form?.time2}</p>

<form
	action="?/time"
	method="post"
	use:enhance={() => {
		return async ({ result }) => {
			applyAction(result);
		};
	}}
>
	<button type="submit">Time2</button>
</form>
