<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Progress } from '$lib/components/ui/progress';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { zxcvbn } from '@zxcvbn-ts/core';
	import { cn } from '$lib/utils.js';
	import { Turnstile } from 'svelte-turnstile';
	import { mode } from 'mode-watcher';
	import OAuth from '$lib/components/auth/OAuth.svelte';

	export let data;

	let reset: () => void | undefined;

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
				reset?.();
				toast.error(form.message.text);
			}
		},
		onError(event) {
			reset?.();
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
		<OAuth />
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
				/>{#if $errors.password}<p class="px-1 text-sm text-red-500">{$errors.password[0]}</p>{/if}
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
			</div>
			<div class="flex w-full content-center justify-center">
				<Turnstile
					bind:reset
					siteKey={data.CLOUDFLARE_CAPTCHA_SITE_KEY}
					appearance="interaction-only"
					theme={$mode}
				/>
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
