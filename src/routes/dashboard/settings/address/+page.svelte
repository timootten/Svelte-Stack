<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';
	import { useAction } from '$lib/client/action.js';
	import type { actions } from './+page.server.js';

	let { data } = $props();

	const { form, enhance, errors, constraints } = superForm(data.addressForm, {
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
</script>

<div class="flex h-full w-full flex-col gap-8 pr-0">
	<form method="post" action="?/address" use:enhance>
		<Card.Root>
			<Card.Header>
				<Card.Title>Address Information</Card.Title>
				<Card.Description>View and update your address details.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="street">Street</Label>
						<Input
							placeholder="123 Main St"
							bind:value={$form.street}
							{...$constraints.street}
							name="street"
							id="street"
						/>
						{#if $errors.street}
							<p class="text-xs text-red-500">{$errors.street[0]}</p>
						{/if}
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="city">City</Label>
						<Input
							placeholder="Anytown"
							bind:value={$form.city}
							{...$constraints.city}
							name="city"
							id="city"
						/>
						{#if $errors.city}
							<p class="text-xs text-red-500">{$errors.city[0]}</p>
						{/if}
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="zip">ZIP Code</Label>
						<Input
							placeholder="12345"
							bind:value={$form.zip}
							{...$constraints.zip}
							name="zip"
							id="zip"
						/>
						{#if $errors.zip}
							<p class="text-xs text-red-500">{$errors.zip[0]}</p>
						{/if}
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="state">State</Label>
						<Input
							placeholder="State"
							bind:value={$form.state}
							{...$constraints.state}
							name="state"
							id="state"
						/>
						{#if $errors.state}
							<p class="text-xs text-red-500">{$errors.state[0]}</p>
						{/if}
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="country">Country</Label>
						<Input
							placeholder="Country"
							bind:value={$form.country}
							{...$constraints.country}
							name="country"
							id="country"
						/>
						{#if $errors.country}
							<p class="text-xs text-red-500">{$errors.country[0]}</p>
						{/if}
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="border-t px-6 py-4">
				<Button type="submit">Save Address</Button>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
