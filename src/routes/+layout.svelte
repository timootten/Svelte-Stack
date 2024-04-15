<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	const flash = getFlash(page);

	$: if ($flash) {
		if ($flash.status === 'success') {
			toast.success($flash.text);
		} else {
			toast.error($flash.text);
		}
		$flash = undefined;
	}
	$: console.log($page);
	let pageName = '';
	$: {
		if ($page.route.id?.includes('404')) {
			pageName = '404';
		} else if ($page.route.id?.includes('dashboard')) {
			pageName = 'Dashboard';
		} else if ($page.route.id?.includes('auth')) {
			pageName = 'Auth';
		}
	}
</script>

<svelte:head>
	<title>Svelte-Stack | {pageName}</title>
	<meta
		name="description"
		content="This is a Svelte-Stack template engineered to expedite your Svelte projects, empowering faster and more efficient development."
	/>
</svelte:head>

<ModeWatcher />
<Toaster richColors position="top-right" />

<div class="relative flex min-h-screen flex-col bg-background" id="page">
	<slot />
</div>
