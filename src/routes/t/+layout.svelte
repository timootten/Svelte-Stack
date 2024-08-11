<script lang="ts">
    import { navigating } from '$app/stores';
    import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  
    import { onMount } from 'svelte';
    import { invalidate, invalidateAll } from '$app/navigation';

    let { children, data } = $props();

    let direct = $state(data.directHit);

    onMount(async () => {
        if(direct) {
            //await invalidateAll();
            await invalidate((url) => true);
			      setTimeout(() => {
            	direct = false;
            }, 500);
        }
    });
</script>
<p>{direct}</p>
{#if $navigating || data.directHit}
    <Loading />
{:else}	
    {@render children?.()}
{/if}
