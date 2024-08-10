<script>
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  

    onMount(() => {
        goto($page.url.pathname);
    });
</script>

{#if $navigating}
	<Loading />
{:else}
	<slot />
{/if}
