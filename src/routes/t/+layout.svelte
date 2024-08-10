<script>
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  
import { onMount } from 'svelte';

    onMount(() => {
        goto($page.url.pathname + $page.url.hash);
    });
</script>

{#if $navigating}
	<Loading />
{:else}
	<slot />
{/if}
