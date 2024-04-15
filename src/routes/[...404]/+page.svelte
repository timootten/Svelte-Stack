<script lang="ts">
	import { page } from '$app/stores';
	import { Footer } from '$lib/components/core/footer';
	import { Header } from '$lib/components/core/header';

	export let data;
</script>

<Header user={data?.user} />
<div class="mx-auto my-auto">
	<p class="text-2xl font-bold">404: Page not found</p>
</div>
<Footer />
