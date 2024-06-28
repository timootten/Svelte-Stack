<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { actions } from './+page.server';
	import { usePolling } from './polling.svelte';

	let { data, form } = $props();

	const { value } = $derived(
		usePolling<typeof actions.timePolling>({
			action: 'timePolling',
			interval: 1000,
			defaultValue: { time: data.time }
		})
	);
</script>

<p>Data: {data.time}</p>
<p>Time: {value.time}</p>
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
