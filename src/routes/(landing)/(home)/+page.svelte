<script>
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';

	export let data;
</script>

<Header user={data.user} />
<Hero />
<Footer />
