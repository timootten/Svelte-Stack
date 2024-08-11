<script>
    import { navigating } from '$app/stores';
    import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  
    import { onMount } from 'svelte';
    import { invalidate } from '$app/navigation';

    let { children, data } = $props();

	let directHit = $state(true);

    onMount(async () => {
        if(directHit) {
            //await invalidate("/t/test2");
            directHit = false;
        }
    });
</script>

{directHit}
{data.directHit}
{#if $navigating || directHit}
	<Loading />
{:else}
	{@render children()}
{/if}
