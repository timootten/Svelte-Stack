<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { actions } from './client';
	import Button from '$lib/components/ui/button/button.svelte';

	let testData = $state('Not Clicked');
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<Button
		onclick={async () => {
			try {
				const data = await actions.test({ message: 'Hello World' }, { test: 'test' });
				testData = JSON.stringify(data);
			} catch (error: any) {
				if (error instanceof Error) toast.error(error.message);
			}
		}}
	>
		Click me
	</Button>
	<span class="text-lg">{testData}</span>
</div>
