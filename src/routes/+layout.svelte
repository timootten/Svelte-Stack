<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';

	const flash = getFlash(page);

	$: if ($flash) {
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
		$flash = undefined;
	}

	let pageName = '';
	$: {
		if ($page.route.id?.includes('404')) {
			pageName = '404';
		} else if ($page.route.id?.includes('dashboard')) {
			pageName = 'Dashboard';
		} else if ($page.route.id?.includes('auth')) {
			pageName = 'Auth';
		} else if ($page.route.id?.includes('landing')) {
			pageName = 'Landing';
		} else if ($page.route.id?.includes('rights')) {
			pageName = 'Rights';
		} else {
			pageName = '404';
		}
	}

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
	<slot />
</div>
