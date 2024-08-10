<script>
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  
import { onMount } from 'svelte';

    let { data } = $props();

    onMount(() => {
        if(data.directHit) goto($page.url.pathname + $page.url.hash);
    });
</script>

{#if $navigating}
	<Loading />
{:else}
	<slot />
{/if}
