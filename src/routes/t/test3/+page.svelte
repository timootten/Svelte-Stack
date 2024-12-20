<script lang="ts">
  	import { invalidate } from '$app/navigation';
    import { browser } from '$app/environment';
    import { page } from '$app/state';  
    import { onMount } from 'svelte';
    
    let { data } = $props();

    /*onMount(() => {
        if(data.directHit) {
            invalidateAll();
        }
    });*/
</script>

<a href="/t/test">Test</a>
<a href="/t/test2">Test2</a>
<br />
<h1>Test3</h1>

{data.directHit}
{#await data.x.takesLong}
	<p>Loading...</p>
{:then value}
	<p>Value: {value.done}</p>
{/await}
{data.clock}
<button onclick={() => {
console.log('Inv');
invalidate("this");
}}> Invalidate </button>
