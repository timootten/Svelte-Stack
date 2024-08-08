<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import House from 'lucide-svelte/icons/house';
	import Package from 'lucide-svelte/icons/package';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import UsersRound from 'lucide-svelte/icons/users-round';
	import { Button } from '$lib/components/ui/button';
	import { toggleMode } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import Avatar from './Avatar.svelte';

	type Props = {
		user: import('lucia').User | null;
		showLogo?: boolean;
	};
	const { user, showLogo = true }: Props = $props();

	const navLinks = [
		{ href: '/#features', label: 'Features', icon: House },
		{ href: '/#testimonials', label: 'Testimonials', icon: ShoppingCart },
		{ href: '/#pricing', label: 'Pricing', icon: Package },
		{ href: '/#faq', label: 'FAQ', icon: UsersRound }
	];

	let activePath = $derived($page.url.pathname + $page.url.hash);
</script>

<header class="z-50 w-full">
	<div class="flex h-14 items-center px-6">
		<div class="mr-4 hidden md:flex">
			{#if showLogo}
				<a href="/" class="mr-6 flex items-center space-x-2">
					<img src="/favicon.png" alt="LOGO" class="h-8 w-8" />
					<span class="hidden font-bold sm:inline-block">Svelte-Stack</span>
				</a>
			{/if}
			<nav class="flex items-center gap-6 text-sm">
				{#each navLinks as { href, label, icon }}
					<a
						{href}
						class={cn(
							'flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80',
							activePath === href ? 'underline' : ''
						)}
						style={activePath === href ? 'view-transition-name: header-navigator;' : ''}
					>
						{label}
					</a>
				{/each}
			</nav>
		</div>
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<a href="##" class="h-5 w-5 md:hidden" use:builder.action {...builder}>
					<svg
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
					>
						<path
							d="M3 5H11"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M3 12H16"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M3 19H21"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
					<span class="sr-only">Dashboard</span>
				</a>
			</Sheet.Trigger>
			<Sheet.Content side="top" class="md:max-w-xs">
				<nav class="grid gap-6 text-lg font-medium">
					<div class="flex flex-row items-center gap-5">
						<a
							href="##"
							class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
						>
							<img src="/favicon.png" alt="LOGO" class="h-8 w-8" />
						</a>
						<span>Svelte-Stack</span>
					</div>
					{#each navLinks as { href, label, icon }}
						<Drawer.Close>
						<a
							{href}
							class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							{#if icon}
								<svelte:component this={icon} class="h-5 w-5" />
							{/if}
							{label}
						</a>
					 </Drawer.Close> 
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex flex-1 items-center justify-end space-x-2">
			<nav class="flex items-center space-x-2">
				{#if user}
					{#if !$page.route.id?.includes('dashboard')}
						<Button href="/dashboard" variant="outline">Dashboard</Button>
					{/if}
				{:else}
					<Button href="/auth/login" variant="outline">Login</Button>
					<Button href="/auth/register">Register</Button>
				{/if}
				<Button on:click={toggleMode} variant="outline" size="icon">
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
				{#if user}
					<Avatar avatarUrl={user.avatarUrl} />
				{/if}
			</nav>
		</div>
	</div>
</header>
<hr />
