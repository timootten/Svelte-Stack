<script lang="ts">
	import { useSSE } from './sse.svelte';
	import type { TYPE } from './+server';

	let { data, form } = $props();

	const { value, close } = useSSE<TYPE>({
		defaultValue: {
			time: data.time
		}
	});
	$inspect(value);
</script>

<p>Data: {data.time}</p>
<p>Time: {value.time}</p>
<p>Time2: {form?.time2}</p>

<button onclick={close}>Cancel</button>
