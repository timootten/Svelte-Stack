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
            //await invalidate();
            await invalidate((url) => true);
            direct = false;
        }
    });
</script>
<p>{direct}</p>
{#if $navigating || direct}
    <Loading />
{:else}	
    {@render children?.()}
{/if}
