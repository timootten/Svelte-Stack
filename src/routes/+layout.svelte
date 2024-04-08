<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
</script>

<ModeWatcher />
<Toaster richColors position="top-right" />

<div class="relative flex min-h-screen flex-col bg-background" id="page">
	<slot />
</div>
