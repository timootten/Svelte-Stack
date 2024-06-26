<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { actions } from './+page.server';
	import { useSSE } from './sse';
	import type { TYPE } from './+server';

	export let data;
	export let form;

	const sse = useSSE<TYPE>({
		defaultValue: {
			time: data.time
		}
	});

	$: console.log($sse);
</script>

<p>Data: {data.time}</p>
<p>Time: {$sse.time}</p>
<p>Time2: {form?.time2}</p>
