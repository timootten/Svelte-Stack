<script>
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  
    import { onMount } from 'svelte';
    import { invalidate } from '$app/navigation';
    export let data;

    onMount(() => {
        if(data.directHit) {
            alert("xxx");
            invalidate();
            //invalidate($page.url.pathname + $page.url.hash);
            //goto($page.url.pathname + $page.url.hash);
        }
    });
</script>

{#if $navigating}
	<Loading />
{:else}
	<slot />
{/if}
