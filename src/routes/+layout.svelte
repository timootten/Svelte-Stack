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
</script>

<ModeWatcher />
<Toaster richColors position="top-right" />

<div class="relative flex min-h-screen flex-col bg-background" id="page">
	<slot />
</div>
