<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';

	export let data: any; // Error cannot determine the type
</script>

<Header user={data?.user} />
<div class="mx-auto my-auto">
	<p class="text-2xl font-bold">{$page.status}: {$page.error?.message}</p>
</div>
<Footer />
