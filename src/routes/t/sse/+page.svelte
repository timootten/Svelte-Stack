<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { actions } from './+page.server';
	import { useSSE } from './sse';
	import type { TYPE } from './+server';

	export let data;
	export let form;

	const { value, close } = useSSE<TYPE>({
		defaultValue: {
			time: data.time
		}
	});
</script>

<p>Data: {data.time}</p>
<p>Time: {$value.time}</p>
<p>Time2: {form?.time2}</p>

<button on:click={close}>Cancel</button>
