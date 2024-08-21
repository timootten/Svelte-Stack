<script lang="ts">
	import LineChart from 'lucide-svelte/icons/chart-area';
	import Package from 'lucide-svelte/icons/package';
	import Home from 'lucide-svelte/icons/house';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Menu from 'lucide-svelte/icons/menu';
	import Users from 'lucide-svelte/icons/users';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { i18n } from '$lib/i18n';

	let { children }: { children?: any } = $props();

	let navItems = [
		{
			icon: Home,
			title: 'Dashboard',
			href: '/dashboard'
		},
		{
			icon: Package,
			title: 'Products',
			href: '/dashboard/products'
		},
		{
			icon: ShoppingCart,
			title: 'Orders',
			href: '/dashboard/todo',
			badge: 6
		},
		{
			icon: Users,
			title: 'Customers',
			href: '/dashboard/todo'
		},
		{
			icon: LineChart,
			title: 'Analytics',
			href: '/dashboard/todo'
		}
	];

	let activePath = $derived(i18n.route($page.url.pathname));
</script>

<div class="grid w-full">
	<div
		class="z-70 fixed inset-y-0 left-0 z-10 hidden w-48 text-wrap break-all border-r bg-background md:block"
	>
		<div class=" flex h-full max-h-screen flex-col gap-2">
			<div class="flex w-full items-center justify-center border-b py-3">
				<a href="/" class="mr-6 flex items-center justify-center space-x-2">
					<enhanced:img src="$img/favicon.png?w=48&h=48&enhanced" alt="LOGO" class="h-8 w-8" />
					<span class="hidden font-bold sm:inline-block">Svelte-Stack</span>
				</a>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium">
					{#each navItems as item}
						{@const Icon = item.icon}
						<a
							href={item.href}
							class={cn(
								'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
								{ 'bg-muted text-primary': activePath === item.href }
							)}
						>
							<Icon />
							{item.title}
							{#if item.badge}
								<Badge
									class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
								>
									{item.badge}
								</Badge>
							{/if}
						</a>
					{/each}
				</nav>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:hidden">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="##" class="flex items-center gap-2 text-lg font-semibold">
							<enhanced:img src="$img/favicon.png?w=48&h=48&enhanced" alt="LOGO" class="h-8 w-8" />
							<span class="hidden bg-red-500 font-bold sm:inline-block">Svelte-Stack</span>
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Home class="h-5 w-5" />
							Dashboard
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
						>
							<ShoppingCart class="h-5 w-5" />
							Orders
							<Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								6
							</Badge>
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Package class="h-5 w-5" />
							Products
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Users class="h-5 w-5" />
							Customers
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<LineChart class="h-5 w-5" />
							Analytics
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root><!--- 
			<div class="w-full flex-1">
				<form>
					<div class="relative">
						<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search..."
							class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>-->
		</header>
		{@render children?.()}
	</div>
</div>
