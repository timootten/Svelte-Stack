<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	let { children } = $props();

	const navItems = [
		{ name: 'General', href: '/dashboard/settings/general' },
		{ name: 'Address', href: '/dashboard/settings/address' },
		{ name: 'Preferences', href: '/dashboard/settings/preferences' },
		{ name: 'Security', href: '/dashboard/settings/security ' },
		{ name: 'Notifications', href: '/dashboard/settings/notifications' },
		{ name: 'Advanced', href: '/dashboard/settings/advanced' }
	];

	let activePath = $derived($page.url.pathname);
</script>

<main
	class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
>
	<div class="mx-auto grid w-full gap-2">
		<h1 class="text-3xl font-semibold">Settings</h1>
	</div>
	<div
		class="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
	>
		<nav class="grid gap-4 text-sm text-muted-foreground">
			{#each navItems as item (item.href)}
				<a href={item.href} class={cn({ 'font-semibold text-primary': activePath === item.href })}>
					{item.name}
				</a>
			{/each}
		</nav>

		<div class="grid gap-6">
			{@render children()}
		</div>
	</div>
</main>
