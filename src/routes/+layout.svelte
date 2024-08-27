<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import '../app.pcss';
	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { theme } from '$lib/client/states.svelte';

	let { children, data } = $props();

	theme.value = data.theme;

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

	/*let pageName = $state('Loading...');

	$effect(() => {
		const routeId = $page.route.id || '';
		const matchingKey = Object.keys(routeToPageMapping).find((key) => routeId.includes(key));
		pageName = matchingKey ? routeToPageMapping[matchingKey] : '404';
	});*/

	let pageName = $derived.by(() => {
		const routeId = $page.route.id || '';
		const matchingKey = Object.keys(routeToPageMapping).find((key) => routeId.includes(key));
		const currentPageName = matchingKey ? routeToPageMapping[matchingKey] : '404';
		return currentPageName;
	});

	// try crossfade https://svelte.dev/repl/0ad58a0d830f4001b91409e40164aa24?version=3.44.1
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

<ParaglideJS {i18n}>
	<Toaster richColors position="top-right" />

	<div class="relative flex min-h-screen flex-col bg-background" id="page">
		{@render children()}
	</div>
</ParaglideJS>
