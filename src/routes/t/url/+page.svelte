<script lang="ts">
	import { page } from '$app/stores';
	import { useURLParams } from './url.svelte';

	let params = useURLParams({ color: 'red', text: '' }, $page.url, { compress: false });

	$inspect(params);
</script>

<input
	class="text-black"
	type="text"
	name=""
	bind:value={params.color}
	placeholder="Write something"
	id=""
/>
<input
	class="text-black"
	type="text"
	name=""
	bind:value={params.text}
	placeholder="Write something"
	id=""
/>
