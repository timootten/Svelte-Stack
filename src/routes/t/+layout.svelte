<script lang="ts">
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { invalidate, invalidateAll } from '$app/navigation';

	let { children, data } = $props();

	//console.log("Data From Layout: " +JSON.stringify(data));

	let direct = $state(false);

	onMount(async () => {
		//  alert("Data: " + JSON.stringify(data));
		if (direct) {
			//await invalidateAll();
			//await invalidate((url) => true);
			await invalidate('current:page');
			direct = false;
		}
	});
</script>

{#if $navigating || direct}
	<Loading />
{:else}
	{@render children?.()}
{/if}
