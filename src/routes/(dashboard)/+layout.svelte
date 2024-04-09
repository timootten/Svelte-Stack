<script>
	import { Header } from '$lib/components/core/header';
	import { Footer } from '$lib/components/core/footer';

	export let data;
</script>

<div class="relative flex min-h-screen flex-col bg-background" id="page">
	<div class="md:pl-14">
		<Header user={data.user} />
	</div>
	<slot />
	<div class="md:pl-14">
		<Footer />
	</div>
</div>
