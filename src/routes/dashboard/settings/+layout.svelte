<script lang="ts">
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import Settings from 'lucide-svelte/icons/settings';

	let { children } = $props();

	const navItems = [
		{ name: 'General', href: '/dashboard/settings/general' },
		{ name: 'Address', href: '/dashboard/settings/address' }
	];

	let activePath = $derived(i18n.route(page.url.pathname));
</script>

<main
	class="relative flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
>
	<div class="mx-auto grid w-full gap-2">
		<h1 class="text-3xl font-semibold">Settings</h1>
	</div>
	<div
		class="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] 2xl:pr-96"
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
	<Settings
		size={250}
		class="absolute right-0 top-0 mr-8 mt-12 hidden rotate-12 text-secondary opacity-50 2xl:block"
	/>
	<Settings
		size={200}
		class="absolute right-0 top-0 mr-48 mt-48 hidden rotate-0 text-secondary opacity-50 2xl:block"
	/>
	<Settings
		size={150}
		class=" absolute right-0 top-0 mr-[132px] mt-[330px] hidden rotate-12 text-secondary opacity-50 2xl:block"
	/>
</main>
