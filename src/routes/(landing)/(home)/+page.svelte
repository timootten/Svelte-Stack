<script>
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';
	import About from '$lib/components/landing/About.svelte';
	import Concepts from '$lib/components/landing/Concepts.svelte';
	import Discover from '$lib/components/landing/Discover.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
	import Newsletter from '$lib/components/landing/Newsletter.svelte';
	import Pricing from '$lib/components/landing/Pricing.svelte';
	import Services from '$lib/components/landing/Services.svelte';
	import Sponsors from '$lib/components/landing/Sponsors.svelte';
	import Team from '$lib/components/landing/Team.svelte';
	import FAQ from '$lib/components/landing/FAQ.svelte';

	export let data;
</script>

<div class="sticky top-0 z-50 w-full bg-background">
	<Header user={data.user} />
</div>
<Hero />
<Sponsors />
<About />
<HowItWorks />
<Features />
<Services />
<Concepts />
<Discover />
<Team />
<Pricing />
<Newsletter />
<FAQ />
<Footer />
