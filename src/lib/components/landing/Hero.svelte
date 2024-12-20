<script>
	import { GitHub } from '../icons';
	import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
	import { Badge } from '../ui/badge';
	import { Button } from '../ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '../ui/card';

	import TimoOttenImage from '$img/Timo_Otten.jpeg?enhanced';
	import placeHolder100 from '$img/placeholder/100.png?enhanced';
	import Check from 'lucide-svelte/icons/check';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';
	import { hightlight } from '$lib/utils';
</script>

<section class="container grid place-items-center gap-10 py-20 md:py-32 xl:grid-cols-2">
	<div class="space-y-6 text-center xl:text-start">
		<main class="text-5xl font-bold md:text-6xl">
			<h1 class="inline">
				<span
					class="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent"
				>
					{m.companyName()}
				</span>
			</h1>
			{@html hightlight(m.landingPageFor(), 'Svelte')}
		</main>

		<p class="mx-auto text-xl text-muted-foreground md:w-10/12 xl:mx-0">
			{m.slogan()}
		</p>

		<div
			class="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 xl:justify-normal"
		>
			<Button class="w-full md:w-1/3">{m.getStarted()}</Button>

			<div class="w-full md:w-1/3">
				<Button
					rel="noreferrer noopener"
					href="https://github.com/timootten/Svelte-Stack"
					target="_blank"
					class="w-full"
					variant="outline"
				>
					<GitHub class="mr-2 h-4 w-4" />
					GitHub
				</Button>
			</div>
		</div>
	</div>

	<div class="z-10">
		<div class="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 xl:flex">
			<Card
				class="absolute -top-[15px] w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			>
				<CardHeader class="flex flex-row items-center gap-4 pb-2">
					<Avatar>
						<enhanced:img src={placeHolder100} alt="John Doe" />
					</Avatar>

					<div class="flex flex-col">
						<CardTitle class="text-lg">John Doe</CardTitle>
						<CardDescription>@john_doe</CardDescription>
					</div>
				</CardHeader>

				<CardContent>{m.exampleTestimonial()}</CardContent>
			</Card>

			<Card
				class="absolute right-[20px] top-4 flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			>
				<CardHeader class="mt-8 flex items-center justify-center pb-2">
					<div class="absolute -top-12">
						<enhanced:img
							src={TimoOttenImage}
							alt="user avatar"
							class="aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]"
						/>
					</div>
					<CardTitle class="text-center">Timo Otten</CardTitle>
					<CardDescription class="font-normal text-orange-500"
						>Full Stack {m.developer()}</CardDescription
					>
				</CardHeader>

				<CardContent class="pb-2 text-center">
					<p>
						{m.meText()}
					</p>
				</CardContent>

				<CardFooter>
					<div>
						<Button
							rel="noreferrer noopener"
							href="https://github.com/timootten/Svelte-Stack"
							target="_blank"
							variant="outline"
							size="icon"
						>
							<span class="sr-only">GitHub</span>
							<GitHub />
						</Button>
					</div>
				</CardFooter>
			</Card>

			<Card
				class="absolute left-[50px] top-[170px] w-72  shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			>
				<CardHeader>
					<CardTitle class="item-center flex justify-between">
						{m.free()}
						<Badge variant="secondary" class="text-sm text-orange-500">{m.popular()}</Badge>
					</CardTitle>
					<div>
						<span class="text-3xl font-bold">
							{#if true}
								{@const price = 0}
								{price.toLocaleString(languageTag(), {
									style: 'currency',
									currency: m.currency()
								})}
							{/if}
						</span>
						<span class="text-muted-foreground"> / {m.month()}</span>
					</div>

					<CardDescription>
						{m.productDescription()}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Button class="w-full">{m.startForFree()}</Button>
				</CardContent>

				<hr class="m-auto mb-4 w-4/5" />

				<CardFooter class="flex">
					<div class="space-y-4">
						{#each ['Drizzle', 'Lucia Auth', 'Paraglide JS'] as benefit}
							<span class="flex">
								<Check class="text-green-500" />
								<h3 class="ml-2">{benefit}</h3>
							</span>
						{/each}
					</div>
				</CardFooter>
			</Card>

			<Card
				class="absolute -bottom-[70px] -right-[10px] w-[350px]  shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			>
				<CardHeader class="flex flex-col items-start justify-start gap-4 space-y-1 p-6 pb-6">
					<CardTitle>{m.features()}</CardTitle>
					<CardDescription class="text-md mt-2">
						{m.featuresDescriptionSmall()}
					</CardDescription>
				</CardHeader>
			</Card>
		</div>
	</div>

	<div class="shadow"></div>
</section>

<style>
	.shadow {
		position: absolute;
		background: hsl(var(--primary) / 0%);
		border-radius: 24px;
		rotate: 35deg;

		width: 260px;
		top: 200px;
		height: 400px;
		filter: blur(150px);
		animation: shadow-slide infinite 4s linear alternate;
	}

	@keyframes shadow-slide {
		from {
			background: hsl(var(--primary) / 20%);
			right: 460px;
		}
		to {
			background: hsl(var(--primary) / 80%);
			right: 160px;
		}
	}

	@media (max-width: 1024px) {
		.shadow {
			top: 70px;
		}

		@keyframes shadow-slide {
			from {
				background: hsl(var(--primary) / 20%);
				right: 460px;
			}
			to {
				background: hsl(var(--primary) / 50%);
				right: 160px;
			}
		}
	}

	@media (max-width: 768px) {
		.shadow {
			top: 70px;
			width: 100px;
			height: 350px;
			filter: blur(60px);
		}

		@keyframes shadow-slide {
			from {
				background: hsl(var(--primary) / 20%);
				right: 280px;
			}
			to {
				background: hsl(var(--primary) / 30%);
				right: 100px;
			}
		}
	}
</style>
