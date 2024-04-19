<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Progress } from '$lib/components/ui/progress';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { zxcvbn } from '@zxcvbn-ts/core';
	import { cn } from '$lib/utils.js';

	export let data;

	let githubLoading = false;
	let googleLoading = false;

	const {
		form,
		enhance: enhanceRegister,
		errors,
		delayed
	} = superForm(data.form, {
		delayMs: 0,
		onUpdated({ form }) {
			if (!form.message) return;
			if (form.message.status === 'success') {
				toast.success(form.message.text);
				goto('/');
			} else {
				toast.error(form.message.text);
			}
		},
		onError(event) {
			toast.error(event.result.error.message);
		}
	});

	$: passwordScore = zxcvbn($form.password || '').score;
</script>

<Card.Root class="mx-auto my-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="mb-1 text-2xl">Sign up</Card.Title>
		<Card.Description>Sign up through the following providers</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex justify-between gap-x-2">
			<form
				class="w-full"
				action="/login?/github"
				method="POST"
				use:enhance={() => {
					githubLoading = true;
				}}
			>
				<Button type="submit" loading={githubLoading} class="mb-4 h-12 w-full"
					><img
						class="hidden p-2 dark:block"
						src="/img/oauth/GitHub.svg"
						alt="GitHub Logo"
						width="48px"
						height="48px"
					/>
					<img
						class="block p-2 dark:hidden"
						src="/img/oauth/GitHub-White.svg"
						alt="GitHub Logo"
						width="48px"
						height="48px"
					/>GitHub</Button
				>
			</form>
			<form
				class="w-full"
				action="/login?/google"
				method="POST"
				use:enhance={() => {
					googleLoading = true;
				}}
			>
				<Button type="submit" loading={googleLoading} class="mb-4 h-12 w-full"
					><img
						class="p-2"
						src="/img/oauth/Google.svg"
						alt="Google Logo"
						width="48px"
						height="48px"
					/>Google</Button
				>
			</form>
		</div>
		<Card.Description class="mb-4">Or enter your email below to create a account</Card.Description>
		<form class="grid gap-4" method="POST" use:enhanceRegister>
			<div class="grid gap-2">
				<Label for="username">Username</Label>
				<Input
					bind:value={$form.username}
					id="username"
					name="username"
					type="username"
					placeholder="Timo"
					autocomplete="nickname"
					required
				/>
				{#if $errors.username}<p class="px-1 text-sm text-red-500">{$errors.username[0]}</p>{/if}
			</div>
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input
					bind:value={$form.email}
					id="email"
					name="email"
					type="email"
					placeholder="timo@example.com"
					autocomplete="email"
					required
				/>
				{#if $errors.email}<p class="px-1 text-sm text-red-500">{$errors.email[0]}</p>{/if}
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
				</div>
				<Input
					bind:value={$form.password}
					name="password"
					id="password"
					type="password"
					autocomplete="password"
					required
				/>
				<Progress
					value={passwordScore * 25}
					text={passwordScore === 0
						? 'Very weak'
						: passwordScore === 1
							? 'Weak'
							: passwordScore === 2
								? 'Medium'
								: passwordScore === 3
									? 'Strong'
									: 'Very strong'}
					class="h-7 font-bold"
					classLoader={cn('bg-red-500', null, {
						'bg-red-500': passwordScore === 1,
						'bg-yellow-500': passwordScore === 2,
						'bg-green-500': passwordScore === 3,
						'bg-emerald-800': passwordScore === 4
					})}
				/>
				{#if $errors.password}<p class="px-1 text-sm text-red-500">{$errors.password[0]}</p>{/if}
			</div>
			<Button type="submit" class="w-full" loading={$delayed}>Register</Button>
			<Button variant="outline" class="w-full" href="/magic-link">Login with Magic Link</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			You have an account?
			<a href="/login" class="underline">Login</a>
		</div>
	</Card.Content>
</Card.Root>
