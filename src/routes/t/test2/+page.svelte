<script lang="ts">
  	import { invalidate } from '$app/navigation';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';  
    import { onMount } from 'svelte';
    
    export let data;

    onMount(() => {
        if(data.directHit) {
            alert("xxx");
            //invalidate();
						setTimeout(() => {
              alert($page.url.pathname + $page.url.hash);
            invalidate($page.url.pathname + $page.url.hash);
            }, 200);
            //goto($page.url.pathname + $page.url.hash);
        }
    });
</script>

<a href="/t/test">Test</a>
<a href="/t/test2">Test2</a>
<br />
<h1>Test2</h1>

{data.directHit}
{#await data.x.takesLong}
	Loading...
{:then value}
	<p>Value: {value.done}</p>
{/await}
