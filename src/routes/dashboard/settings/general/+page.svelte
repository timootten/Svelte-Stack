<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { Label } from '$lib/components/ui/label';
	import { zxcvbn } from '@zxcvbn-ts/core';
	import PasswordScore from '$lib/components/dashboard/PasswordScore.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { generalSchema } from './schema.js';

	let { data } = $props();

	const { form, enhance, errors, constraints } = superForm(data.generalForm, {
		validators: zod(generalSchema),
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

	const {
		form: passwordForm,
		enhance: passwordEnhance,
		errors: passwordErrors,
		constraints: passwordConstraints
	} = superForm(data.passwordForm, {
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

	let passwordScore = $derived(zxcvbn($passwordForm.password || '').score);
</script>

<div class="flex h-full w-full flex-col gap-8 pr-0 2xl:pr-96">
	<form method="post" action="?/general" use:enhance>
		<Card.Root>
			<Card.Header>
				<Card.Title>General</Card.Title>
				<Card.Description>View and manage your account settings and preferences.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="username">Username</Label>
						<Input
							placeholder="Timo"
							bind:value={$form.username}
							{...$constraints.username}
							name="username"
							id="username"
							required
						/>
						{#if $errors.username}
							<p class="text-xs text-red-500">{$errors.username[0]}</p>
						{/if}
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="email">Email</Label>
						<Input
							placeholder="timo@example.com"
							bind:value={$form.email}
							{...$constraints.email}
							name="email"
							autocomplete="email"
							id="email"
							required
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
	<form method="post" action="?/password" use:passwordEnhance>
		<Card.Root>
			<Card.Header>
				<Card.Title>Change Password</Card.Title>
				<Card.Description
					>Update your account security by changing your password regularly.</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="password">Password</Label>
						<Input
							bind:value={$passwordForm.password}
							{...$passwordConstraints.password}
							name="password"
							autocomplete="password"
							id="password"
							type="password"
							required
						/>
						{#if $passwordErrors.password}
							<p class="text-xs text-red-500">{$passwordErrors.password[0]}</p>
						{/if}
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="confirmPassword">Confirm Password</Label>
						<Input
							bind:value={$passwordForm.confirmPassword}
							{...$passwordConstraints.confirmPassword}
							name="confirmPassword"
							autocomplete="confirmPassword"
							id="confirmPassword"
							type="password"
							required
						/>
						{#if $passwordErrors.confirmPassword}
							<p class="text-xs text-red-500">{$passwordErrors.confirmPassword[0]}</p>
						{/if}
					</div>
					<PasswordScore score={passwordScore} />
				</div>
			</Card.Content>
			<Card.Footer class="border-t px-6 py-4">
				<Button type="submit">Save</Button>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
