<script lang="ts">
	import { page } from '$app/state';
	import { useURLParams } from '../lib/url.svelte';

	let params = useURLParams({ color: 'red', text: '' }, page, {
		compress: false,
		param: 'search'
	});
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
