<script lang="ts">
  	import { invalidate } from '$app/navigation';
    
	export let data;

    if(data.directHit) {
    	invalidate();
    }
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
