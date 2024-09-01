<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { Label } from '$lib/components/ui/label';
	import PasswordScore from '$lib/components/dashboard/PasswordScore.svelte';
	//import { zodClient } from 'sveltekit-superforms/adapters';
	//import { generalSchema } from './schema.js';
	import Check from 'lucide-svelte/icons/check';
	import Send from 'lucide-svelte/icons/send';
	import type { zxcvbn as zxcvbnType } from '@zxcvbn-ts/core';
	import { onMount } from 'svelte';
	import { useAction } from '$lib/client/action.js';
	import type { actions } from './+page.server.js';

	let { data } = $props();

	const { form, enhance, errors, constraints } = superForm(data.generalForm, {
		//validators: zodClient(generalSchema),
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

	let zxcvbn: typeof zxcvbnType | undefined = $state<typeof zxcvbnType | undefined>(undefined);

	let retryAfterEmail = $state(data.retryAfterEmail);

	onMount(async () => {
		zxcvbn = (await import('@zxcvbn-ts/core')).zxcvbn;

		startVerifyEmailCooldown(data.retryAfterEmail);
	});

	const startVerifyEmailCooldown = (retryAfter: number) => {
		if (!retryAfter) return;
		retryAfterEmail = retryAfter;
		const intervalId = setInterval(() => {
			retryAfterEmail = retryAfterEmail - 1;
			if (retryAfterEmail === 0) {
				clearInterval(intervalId);
			}
		}, 1000);
	};

	let passwordScore = $derived(zxcvbn ? zxcvbn($passwordForm.password || '').score : 0);

	const verifyEmail = async () => {
		const result = await useAction<typeof actions.verifyEmail>('verifyEmail');
		console.log(result);
		if (result.status === 'success') {
			toast.success(result.text);
			startVerifyEmailCooldown(result.retryAfter);
		} else {
			toast.error(result.text);
		}
	};
</script>

<div class="flex h-full w-full flex-col gap-8 pr-0">
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
						<div class="flex">
							<Input
								class="rounded-r-none"
								placeholder="timo@example.com"
								bind:value={$form.email}
								{...$constraints.email}
								name="email"
								autocomplete="email"
								id="email"
								required
							/>
							{#if data.user?.emailVerified}
								<Button class="rounded-l-none bg-green-700 !opacity-100" disabled>
									<span class="pr-2">Verified</span>
									<Check class="h-4 w-4" />
								</Button>
							{:else}
								<div class="relative">
									<Button
										disabled={retryAfterEmail !== 0}
										class="relative h-full w-full rounded-l-none"
										onclick={verifyEmail}
									>
										<span class="pr-2">Verify E-Mail</span>
										<Send class="h-4 w-4" />
									</Button>
									{#if retryAfterEmail}
										<span
											class="absolute inset-0 flex items-center justify-center text-xl font-bold text-white"
											>{retryAfterEmail}s</span
										>
									{/if}
								</div>
							{/if}
						</div>
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
