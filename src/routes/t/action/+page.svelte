<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { actions } from './+page.server';
	import { useAction } from './action.svelte';
 	import { goto } from '$app/navigation';
 	import { onMount } from 'svelte';

 	let { data, form } = $props();
 
	const action = useAction<typeof actions.timePolling>('timePolling')

</script>

<p>Data: {data.time}</p>
{#await action.value}
	<p>Loading...</p>
{:then value}
	<p>Value: {value.time}</p>
{/await}
