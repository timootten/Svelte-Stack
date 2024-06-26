<script>
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';
</script>

{#if $navigating}
	<Loading />
{:else}
	<slot />
{/if}
