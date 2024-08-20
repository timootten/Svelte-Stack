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
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import Avatar from './Avatar.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Select from '$lib/components/ui/select';
	import Settings from 'lucide-svelte/icons/settings';
	import { getLanguageFlag, getLanguageName, i18n } from '$lib/i18n';
	import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js';
	import { Label } from '../ui/label';
	import { goto } from '$app/navigation';
	import * as m from '$lib/paraglide/messages';

	type Props = {
		user: import('lucia').User | null;
		showLogo?: boolean;
	};
	const { user, showLogo = true }: Props = $props();

	const navLinks = [
		{ href: '/#features', label: m.features(), icon: House },
		{ href: '/#testimonials', label: m.testimonials(), icon: ShoppingCart },
		{ href: '/#pricing', label: m.pricing(), icon: Package },
		{ href: '/#faq', label: m.faq(), icon: UsersRound }
	];

	let activePath = $derived(i18n.route($page.url.pathname) + $page.url.hash);

	let open = $state(false);

	const onMobileClick = async (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		}
	) => {
		event.preventDefault();
		open = false;
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		setTimeout(() => {
			if (anchorId === '') {
				window.scroll({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
			} else {
				window.scrollTo({
					top: anchor?.offsetTop,
					behavior: 'smooth'
				});
			}
		}, 500);
	};

	let language = $state(languageTag());
</script>

<header class="z-50 w-full">
	<div class="flex h-14 items-center px-6">
		<div class="mr-4 hidden md:flex">
			{#if showLogo}
				<a href="/" class="mr-6 flex items-center space-x-2">
					<enhanced:img src="$static/favicon.png?w=32&h=32&enhanced" alt="LOGO" class="h-8 w-8" />
					<span class="hidden font-bold sm:inline-block">Svelte-Stack</span>
				</a>
			{/if}
			<nav class="flex items-center gap-6 text-sm">
				{#each navLinks as { href, label }}
					<a
						{href}
						class={cn(
							'flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80',
							activePath === href ? 'underline' : ''
						)}
					>
						{label}
					</a>
				{/each}
			</nav>
		</div>
		<Sheet.Root bind:open>
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
			<Sheet.Content side="left" class="md:max-w-xs">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="/" onclick={onMobileClick} class="flex flex-row items-center gap-5">
						<div
							class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
						>
							<enhanced:img
								src="$static/favicon.png?w=32&h=32&enhanced"
								alt="LOGO"
								class="h-8 w-8"
							/>
						</div>
						<span>Svelte-Stack</span>
					</a>
					{#each navLinks as { href, label, icon }}
						<a
							rel="noreferrer noopener"
							{href}
							onclick={onMobileClick}
							class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							{#if icon}
								<svelte:component this={icon} class="h-5 w-5" />
							{/if}
							{label}
						</a>
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex flex-1 items-center justify-end space-x-2">
			<nav class="flex items-center space-x-2">
				{#if user}
					{#if !$page.route.id?.includes('dashboard')}
						<Button href="/dashboard" variant="outline">{m.dashboard()}</Button>
					{/if}
				{:else}
					<Button href="/auth/login" variant="outline">{m.login()}</Button>
					<Button href="/auth/register">{m.register()}</Button>
				{/if}
				<Popover.Root portal={null}>
					<Popover.Trigger asChild let:builder>
						<Button builders={[builder]} variant="outline" size="icon">
							<Settings class="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</Popover.Trigger>
					<Popover.Content class="w-auto">
						<div class="grid gap-4">
							<div class="space-y-2">
								<h4 class="font-medium leading-none">{m.settings()}</h4>
							</div>
							<div class="flex gap-2">
								<div class="flex flex-col gap-y-2">
									<Label>{m.language()}</Label>
									<Select.Root
										selected={{ value: languageTag(), label: getLanguageName(languageTag()) }}
										onSelectedChange={(selected) => {
											if (selected) {
												language = selected.value;
												const route = i18n.route($page.url.pathname);
												goto(i18n.resolveRoute(route, selected.value) + $page.url.hash);
											}
										}}
									>
										<Select.Trigger class="w-[180px]">
											<div class="flex h-full content-center gap-x-2">
												<svelte:component this={getLanguageFlag(language)} />
												<Select.Value class="pt-0.5" placeholder="Language" />
											</div>
										</Select.Trigger>
										<Select.Content>
											{#each availableLanguageTags as lang}
												<Select.Item
													value={lang}
													aria-current={lang === languageTag() ? 'page' : undefined}
													class="gap-x-2"
												>
													<svelte:component this={getLanguageFlag(lang)} />
													{getLanguageName(lang)}
												</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>
								<div class="flex flex-col gap-y-2">
									<Label>{m.theme()}</Label>
									<Button on:click={toggleMode} variant="outline" size="icon">
										<Sun
											class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
										/>
										<Moon
											class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
										/>
										<span class="sr-only">Toggle theme</span>
									</Button>
								</div>
							</div>
						</div>
					</Popover.Content>
				</Popover.Root>
				{#if user}
					<Avatar avatarUrl={user.avatarUrl} />
				{/if}
			</nav>
		</div>
	</div>
</header>
<hr />
