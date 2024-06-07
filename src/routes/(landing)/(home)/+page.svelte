<script>
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';
	import About from '$lib/components/landing/About.svelte';
	import Concepts from '$lib/components/landing/Concepts.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
	import Services from '$lib/components/landing/Services.svelte';
	import Sponsors from '$lib/components/landing/Sponsors.svelte';

	export let data;
</script>

<Header user={data.user} />
<Hero />
<Sponsors />
<About />
<HowItWorks />
<Features />
<Services />
<Concepts />
<Footer />
