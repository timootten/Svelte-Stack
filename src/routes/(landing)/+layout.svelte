<script lang="ts">
	import ScrollToTop from '$lib/components/landing/ScrollToTop.svelte';
</script>

<div class="min-h-screen w-full">
	<slot />
	<ScrollToTop />
</div>
