<script lang="ts">
	import type { TYPE } from './+server';
	import { useSSE } from './sse.svelte';

	let { data } = $props();

	const { value, close } = $derived(
		useSSE<TYPE>({
			defaultValue: {
				time: data.time
			}
		})
	);
</script>

<p>Data: {data.time}</p>
<p>Time: {value.time}</p>

<button onclick={close}>Cancel</button>
