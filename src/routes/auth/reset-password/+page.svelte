<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
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
</script>

<Card.Root class="mx-auto my-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Change your Password</Card.Title>
		<Card.Description>Enter your new password below to change it</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="grid gap-4" method="POST" use:enhanceLogin>
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
				{#if $errors.password}<p class="px-1 text-sm text-red-500">{$errors.password[0]}</p>{/if}
			</div>
			<div class="flex w-full content-center justify-center">
				<Turnstile
					bind:reset
					siteKey={data.CLOUDFLARE_CAPTCHA_SITE_KEY}
					appearance="always"
					theme={$mode}
				/>
			</div>
			<Button type="submit" class="w-full" loading={$delayed}>Change Password</Button>
		</form>
	</Card.Content>
</Card.Root>
