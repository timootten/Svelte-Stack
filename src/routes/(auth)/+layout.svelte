<script>
	import { Footer } from '$lib/components/core/footer';
	import { Header } from '$lib/components/core/header';

	export let data;
</script>

<Header user={data.user} />
<slot />
<Footer />
