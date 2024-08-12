<script lang="ts">
  	import { invalidate } from '$app/navigation';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';  
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

{data.clock}
<button onclick={() => {
console.log('Inv');
invalidate((url) => { 
    console.log(url)
    return true
} );
}}> Invalidate </button>
<button onclick={() => {
console.log('Inv X');
invalidate("x:x");
}}> Invalidate X </button>
