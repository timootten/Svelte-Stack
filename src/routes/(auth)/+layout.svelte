<script>
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';

	export let data;
</script>

<Header user={data.user} />
<slot />
<Footer />
