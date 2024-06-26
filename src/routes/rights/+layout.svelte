<script lang="ts">
	import Footer from '$lib/components/core/Footer.svelte';
	import Header from '$lib/components/core/Header.svelte';
	import ScrollToTop from '$lib/components/landing/ScrollToTop.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';

	export let data;

	let navItems = [
		{ name: 'Imprint', href: '/rights/imprint' },
		{ name: 'Privacy Policy', href: '/rights/privacy' },
		{ name: 'Terms & Conditions', href: '/rights/terms' },
		{ name: 'Right of Withdrawal', href: '/rights/withdrawal' },
		{ name: 'Cookie Policy', href: '/rights/cookie' }
	];

	$: activePath = $page.url.pathname;
</script>

<div class="flex min-h-screen w-full flex-col">
	<div class="z-50 w-full bg-background">
		<Header user={data.user} />
	</div>
	<div class="my-auto">
		<Card.Root class="mx-8 mt-8 md:mx-16">
			<Card.Content>
				<div class="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
					<div class="mt-8 hidden rounded-2xl bg-muted/40 shadow md:block">
						<div class="flex flex-col gap-2">
							<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
								<span class="flex items-center gap-2 font-semibold">Rights</span>
							</div>
							<div class="flex-1">
								<nav class="mt-2 grid items-start px-2 text-sm font-medium lg:px-4">
									{#each navItems as item (item.href)}
										<a
											href={item.href}
											class={cn(
												'relative z-50 flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
												{
													'bg-muted text-primary': activePath === item.href,
													'text-muted-foreground hover:text-primary': activePath !== item.href
												}
											)}
											style={activePath === item.href
												? 'view-transition-name: rights-navigator;'
												: ''}
										>
											{item.name}
										</a>
									{/each}
								</nav>
							</div>
						</div>
					</div>
					<div class="flex flex-col">
						<header class="ml-3 mt-2 flex h-14 items-center gap-4 md:hidden">
							<Sheet.Root>
								<Sheet.Trigger asChild let:builder>
									<Button
										variant="outline"
										size="icon"
										class="shrink-0 md:hidden"
										builders={[builder]}
									>
										<Menu class="h-5 w-5" />
										<span class="sr-only">Toggle navigation menu</span>
									</Button>
								</Sheet.Trigger>
								<span class="flex items-center gap-2 font-semibold">Legal</span>
								<Sheet.Content side="left" class="flex flex-col">
									<span class="flex items-center gap-2 font-semibold">Legal</span>
									<hr />
									<nav class="grid gap-2 text-lg font-medium">
										{#each navItems as item}
											<Sheet.Close>
												<a
													href={item.href}
													class={cn('mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2', {
														'bg-muted text-primary': activePath === item.href,
														'text-muted-foreground hover:text-foreground': activePath !== item.href
													})}
												>
													{item.name}
												</a>
											</Sheet.Close>
										{/each}
									</nav>
								</Sheet.Content>
							</Sheet.Root>
						</header>
						<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
							<slot />
						</main>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
	<Footer />
	<ScrollToTop />
</div>
