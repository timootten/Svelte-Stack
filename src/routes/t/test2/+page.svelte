<script lang="ts">
	export let data;
</script>

<a href="/t/test">Test</a>
<a href="/t/test2">Test2</a>
<br />
<h1>Test2</h1>

{#await data.takesLong}
	Loading...
{:then value}
	<p>Value: {value.done}</p>
{/await}
