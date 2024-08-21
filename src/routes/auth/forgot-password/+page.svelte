<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { mode } from 'mode-watcher';
	import { Turnstile } from '$lib/components/utils/Turnstile/index.js';

	export let data;

	let reset: () => void | undefined;

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
		<Card.Title class="mb-1 text-2xl">Forgot password</Card.Title>
		<Card.Description>Enter your email below to reset your password</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="grid gap-4" method="POST" use:enhanceLogin>
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
			<div class="flex h-[65px] w-full content-center justify-center">
				<Turnstile
					bind:reset
					siteKey={data.CLOUDFLARE_CAPTCHA_SITE_KEY}
					appearance="always"
					theme={$mode}
				/>
			</div>
			<Button type="submit" class="w-full" loading={$delayed}>Forgot password</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/auth/register" class="underline">Sign up</a>
		</div>
	</Card.Content>
</Card.Root>
