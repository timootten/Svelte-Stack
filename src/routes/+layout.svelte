<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
 import { navigating } from '$app/stores';
	import Loading from '$lib/components/core/Loading.svelte';

	let { children } = $props();

	const flash = getFlash(page);

	$effect(() => {
		if ($flash) {
			const text = $flash.text;
			if ($flash.status === 'success') {
				setTimeout(() => {
					toast.success(text);
				}, 250);
			} else {
				setTimeout(() => {
					toast.error(text);
				}, 250);
			}
		}
		$flash = undefined;
	});

	const routeToPageMapping: Record<string, string> = {
		dashboard: 'Dashboard',
		auth: 'Auth',
		landing: 'Landing',
		rights: 'Rights'
	};

	let pageName = $state('Loading...');

	$effect(() => {
		const routeId = $page.route.id || '';
		const matchingKey = Object.keys(routeToPageMapping).find((key) => routeId.includes(key));
		pageName = matchingKey ? routeToPageMapping[matchingKey] : '404';
	});

	onNavigate(() => {
		if (!document.startViewTransition) return;

		return new Promise((fulfil) => {
			document.startViewTransition(() => new Promise(fulfil));
		});
	});
</script>

<svelte:head>
	<title>Svelte-Stack | {pageName}</title>
	<meta
		name="description"
		content="This is a Svelte-Stack template engineered to expedite your Svelte projects, empowering faster and more efficient development."
	/>
</svelte:head>

<ModeWatcher defaultMode={'dark'} />
<Toaster richColors position="top-right" />

<div class="relative flex min-h-screen flex-col bg-background" id="page">

	<Loading /> 

</div>
