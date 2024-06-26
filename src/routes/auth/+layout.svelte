<script>
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';
	import Loading from '$lib/components/core/Loading.svelte';
	import { navigating } from '$app/stores';

	export let data;
</script>

<Header user={data.user} />
{#if $navigating}
	<Loading />
{:else}
	<div class="my-auto py-12">
		<slot />
	</div>
{/if}
<Footer />
