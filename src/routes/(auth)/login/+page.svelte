<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let data;

	let githubLoading = false;
	let googleLoading = false;

	const {
		form,
		enhance: enhanceLogin,
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
		}
	});
</script>

<Card.Root class="mx-auto my-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="mb-1 text-2xl">Login</Card.Title>
		<Card.Description>Login through the following providers</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex justify-between gap-x-2">
			<form
				class="w-full"
				action="?/github"
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
					/>
					GitHub</Button
				>
			</form>
			<form
				class="w-full"
				action="?/google"
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
		<Card.Description class="mb-4"
			>Or enter your email below to login to your account</Card.Description
		>
		<form class="grid gap-4" action="?/login" method="POST" use:enhanceLogin>
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
					<a href="/forgot-password" class="ml-auto inline-block text-sm underline">
						Forgot your password?
					</a>
				</div>
				<Input
					bind:value={$form.password}
					name="password"
					id="password"
					type="password"
					autocomplete="password"
					required
				/>
				{#if $errors.password}<p class="px-1 text-sm text-red-500">{$errors.password[0]}</p>{/if}
			</div>
			<Button type="submit" class="w-full" loading={$delayed}>Login</Button>
			<Button variant="outline" class="w-full" href="/magic-link">Login with Magic Link</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/register" class="underline">Sign up</a>
		</div>
	</Card.Content>
</Card.Root>
