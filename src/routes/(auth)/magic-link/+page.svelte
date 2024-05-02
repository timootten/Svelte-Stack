<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import { Turnstile } from 'svelte-turnstile';

	export let data;

	let githubLoading = false;
	let googleLoading = false;

	let reset: () => void | undefined;

	const {
		form,
		enhance: magicEnhance,
		errors,
		delayed
	} = superForm(data.form, {
		delayMs: 0,
		onUpdated({ form }) {
			if (!form.message) return;
			if (form.message.status === 'success') {
				toast.success(form.message.text);
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
</script>

<Card.Root class="mx-auto my-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="mb-1 text-2xl">Magic Link</Card.Title>
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
		<Card.Description class="mb-4">Or enter your email below to get a magic link</Card.Description>
		<form class="grid gap-4" method="POST" use:magicEnhance>
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
			<div class="flex w-full content-center justify-center">
				<Turnstile
					bind:reset
					siteKey={data.CLOUDFLARE_CAPTCHA_SITE_KEY}
					appearance="interaction-only"
				/>
			</div>
			<Button type="submit" class="w-full" loading={$delayed}>Magic Link</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/register" class="underline">Sign up</a>
		</div>
	</Card.Content>
</Card.Root>
