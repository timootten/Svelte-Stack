<script>
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  
    import { onMount } from 'svelte';
    import { invalidateAll } from '$app/navigation';
    export let data;

	let directHit = data.directHit;

    onMount(async () => {
        if(directHit) {
            await invalidateAll();
            directHit = false
        }
    });
</script>

{#if $navigating || directHit}
	<Loading />
{:else}
	<slot />
{/if}
