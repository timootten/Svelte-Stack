<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { actions } from './+page.server';
	import { onMount } from 'svelte';
	import { usePolling } from './polling.svelte';

	let { data, form } = $props();

	const test = () => {
		let value = $state('1');

		console.log('1XXX');
		onMount(() => {
			console.log('2XXX');
		});

		return {
			get value() {
				return value;
			}
		};
	};

	const { value } = $derived(
		usePolling<typeof actions.timePolling>({
			action: 'timePolling',
			interval: 1000,
			defaultValue: { time: data.time }
		})
	);

	$inspect(value);
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
