<script lang="ts">
	import type { TYPE } from './+server';
	import { useSSE } from './sse.svelte';

	let { data, form } = $props();

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
<p>Time2: {form?.time2}</p>

<button onclick={close}>Cancel</button>
