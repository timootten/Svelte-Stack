<script lang="ts">
	import type { actions } from './+page.server';
	import { useAction } from './action.svelte';

	let { data } = $props();

	const timeValue = useAction<typeof actions.timePolling>('timePolling');
</script>

<p>Data: {data.time}</p>
{#await timeValue()}
	<p>Loading...</p>
{:then value}
	<p>Value: {value.time}</p>
{/await}
