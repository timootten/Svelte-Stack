<script lang="ts">
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';
	import { client } from './client';
	import { SAError } from './lib/error';

	let testData = $state('Not Clicked');
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<Button
		onclick={async () => {
			try {
				const x = await client.user.test.abc();

				console.log(x);
			} catch (error: any) {
				if (error instanceof SAError) {
					toast.error(error.status + ': ' + error.message);
				}
			}
		}}
	>
		Click me
	</Button>
	<span class="text-lg">{testData}</span>
</div>
