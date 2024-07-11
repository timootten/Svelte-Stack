<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { Label } from '$lib/components/ui/label';

	let { data } = $props();

	const { form, enhance, errors } = superForm(data.generalForm, {
		resetForm: false,
		delayMs: 0,
		onUpdated({ form }) {
			if (!form.message) return;
			if (form.message.status === 'success') {
				toast.success(form.message.text);
			} else {
				toast.error(form.message.text);
			}
		},
		onError(event) {
			toast.error(event.result.error.message);
		}
	});

	$inspect($form.email).with(console.error);
</script>

<form method="post" action="?/general" use:enhance>
	<Card.Root>
		<Card.Header>
			<Card.Title>General</Card.Title>
			<Card.Description>Used to identify your store in the marketplace.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="username">Username</Label>
					<Input placeholder="Timo" bind:value={$form.username} name="username" id="username" />
					{#if $errors.username}
						<p class="text-xs text-red-500">{$errors.username[0]}</p>
					{/if}
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="email">Email</Label>
					<Input
						placeholder="timo@example.com"
						bind:value={$form.email}
						name="email"
						autocomplete="email"
						id="email"
					/>
					{#if $errors.email}
						<p class="text-xs text-red-500">{$errors.email[0]}</p>
					{/if}
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button type="submit">Save</Button>
		</Card.Footer>
	</Card.Root>
</form>
<SuperDebug data={$form} />
