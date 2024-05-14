<script lang="ts">
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';

	export let data;
</script>

<Header user={data?.user} />
<div class="mx-auto my-auto">
	<p class="text-2xl font-bold">404: Page not found</p>
</div>
<Footer />
