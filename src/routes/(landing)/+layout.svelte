<script lang="ts">
	import ScrollToTop from '$lib/components/core/ScrollToTop.svelte';
</script>

<div class="min-h-screen w-full">
	<slot />
	<ScrollToTop />
</div>
