<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import OAuth from '$lib/components/auth/OAuth.svelte';
	import { Turnstile } from '$lib/components/utils/Turnstile/index.js';
	import { theme } from '$lib/client/states.svelte.js';
	import { languageTag } from '$lib/paraglide/runtime.js';

	let { data } = $props();

	let reset: (() => void) | undefined = $state();

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
		<OAuth />
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
			<div class="flex h-[65px] w-full content-center justify-center">
				<Turnstile
					bind:reset
					language={languageTag()}
					siteKey={data.CLOUDFLARE_CAPTCHA_SITE_KEY}
					appearance="always"
					theme={theme.value}
				/>
			</div>
			<Button type="submit" class="w-full" loading={$delayed}>Send Magic Link</Button>
		</form>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/auth/register" class="underline">Sign up</a>
		</div>
	</Card.Content>
</Card.Root>
