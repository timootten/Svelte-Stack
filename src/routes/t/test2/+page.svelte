<script lang="ts">
  	import { invalidateAll } from '$app/navigation';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';  
    import { onMount } from 'svelte';
    
    export let data;

    onMount(() => {
        if(data.directHit) {
            invalidateAll();
        }
    });
</script>

<a href="/t/test">Test</a>
<a href="/t/test2">Test2</a>
<br />
<h1>Test2</h1>

{data.directHit}
{#await data.x.takesLong}
	<p>Loading...</p>
{:then value}
	<p>Value: {value.done}</p>
{/await}
{data.clock}
<button on:click={() => {
console.log('Inv');
invalidateAll();
}}> Invalidate </button>
