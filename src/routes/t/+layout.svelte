<script>
	import { navigating } from '$app/stores';
</script>

XXXXXXX

{#if $navigating}
	<div>Loading...</div>
{:else}
	<slot />
{/if}
