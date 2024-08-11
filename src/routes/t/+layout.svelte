<script lang="ts">
    import { navigating } from '$app/stores';
    import Loading from '$lib/components/core/Loading.svelte';
    import { page } from '$app/stores';  
    import { onMount } from 'svelte';
    import { invalidate } from '$app/navigation';

    let { children } = $props();

    let direct = $state(true);

    onMount(async () => {
        if(direct) {
            //await invalidate("/t/test2");
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
