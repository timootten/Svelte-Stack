<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import UsersRound from 'lucide-svelte/icons/users-round';
	import { Button } from '$lib/components/ui/button';
	import { toggleMode } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import { enhance } from '$app/forms';

	export let user: import('lucia').User | null;
</script>

<header class="z-50 w-full">
	<div class=" flex h-14 items-center px-6">
		<div class="mr-4 hidden md:flex">
			<a href="/" class="mr-6 flex items-center space-x-2"
				><img src="/favicon.png" alt="LOGO" class="h-8 w-8" /><span
					class="hidden font-bold sm:inline-block">Svelte-Stack</span
				></a
			>
			<nav class="flex items-center gap-6 text-sm">
				<a href="/docs" class="text-foreground/60 transition-colors hover:text-foreground/80"
					>Docs</a
				>
				<a
					href="/docs/components"
					class="text-foreground/60 transition-colors hover:text-foreground/80">Components</a
				>
				<a href="/themes" class="text-foreground/60 transition-colors hover:text-foreground/80"
					>Themes</a
				>
				<a href="/examples" class="text-foreground/60 transition-colors hover:text-foreground/80"
					>Examples</a
				>
				<a href="/blocks" class="text-foreground/60 transition-colors hover:text-foreground/80"
					>Blocks</a
				>
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
						><path
							d="M3 5H11"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path><path
							d="M3 12H16"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path><path
							d="M3 19H21"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path></svg
					>
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
					<a
						href="##"
						class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Home class="h-5 w-5" />
						Dashboard2
					</a>
					<a href="##" class="flex items-center gap-4 px-2.5 text-foreground">
						<ShoppingCart class="h-5 w-5" />
						Orders
					</a>
					<a
						href="##"
						class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Package class="h-5 w-5" />
						Products
					</a>
					<a
						href="##"
						class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<UsersRound class="h-5 w-5" />
						Customers
					</a>
					<a
						href="##"
						class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<LineChart class="h-5 w-5" />
						Settings
					</a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex flex-1 items-center justify-end space-x-2">
			<nav class="flex items-center space-x-2">
				{#if user}
					<Button href="/dashboard" variant="outline">Dashboard</Button>
					<form action="/dashboard?/logout" method="post" use:enhance>
						<Button type="submit">Logout</Button>
					</form>
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
			</nav>
		</div>
	</div>
</header>
<hr />
