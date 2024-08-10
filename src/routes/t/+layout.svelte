<script>
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  
    import { onMount } from 'svelte';

    export let data;

    onMount(() => {
        if(data.directHit) {
            alert("xxx");
            goto($page.url.pathname + $page.url.hash);
        }
    });
</script>

{#if $navigating}
	<Loading />
{:else}
	<slot />
{/if}
