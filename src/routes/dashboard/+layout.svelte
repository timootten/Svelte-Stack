<script>
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';
	import Sidebar from '$lib/components/dashboard/Sidebar.svelte';

	export let data;
</script>

<div class="relative flex min-h-screen flex-col bg-background" id="page">
	<div class="md:pl-48">
		<Header user={data.user} showLogo={false} />
		<Sidebar />
	</div>
	<div class="flex flex-1 md:pl-48">
		<slot />
	</div>
	<div class="md:pl-48">
		<Footer />
	</div>
</div>
