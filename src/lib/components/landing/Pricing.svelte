<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '../ui/card';
	import { Button } from '../ui/button';
	import { Badge } from '../ui/badge';
	import * as m from '$lib/paraglide/messages';

	// Import necessary components

	// Enum for PopularPlanType
	const PopularPlanType = {
		NO: 0,
		YES: 1
	};

	// Pricing data
	const pricingList = [
		{
			title: m.free(),
			popular: PopularPlanType.NO,
			price: 0,
			description:
				'Always free under the MIT license, ensuring you have unrestricted access to all features without any cost.',
			buttonText: m.getStartedButton(),
			benefitList: ['Open Source', 'Fast', 'Many Features', 'Preconfigured', 'Community support']
		},
		{
			title: m.sponsor(),
			popular: PopularPlanType.YES,
			price: 5,
			description: 'Support the project and get better support for your questions.',
			buttonText: m.becomeSponsorButton(),
			benefitList: ['Open Source', 'Fast', 'Many Features', 'Preconfigured', 'Priority support']
		},
		{
			title: m.sponsorPlus(),
			popular: PopularPlanType.NO,
			price: 20,
			description: 'Get premium support and contribute significantly to the project.',
			buttonText: m.becomeSponsorPlusButton(),
			benefitList: ['Open Source', 'Fast', 'Many Features', 'Preconfigured', 'Premium support']
		}
	];
</script>

<section id="pricing" class="container py-24 sm:py-32">
	<h2 class="text-center text-3xl font-bold md:text-4xl">
		{m.get()}
		<span class="text-orange-500"> {m.unlimited()} </span>
		{m.access()}
	</h2>
	<h3 class="pb-8 pt-4 text-center text-xl text-muted-foreground">
		{m.pricingDescription()}
	</h3>
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each pricingList as pricing}
			<Card
				class={`flex h-full flex-col ${
					pricing.popular === PopularPlanType.YES
						? 'shadow-black/10 drop-shadow-xl dark:shadow-white/10'
						: ''
				}`}
			>
				<CardHeader>
					<CardTitle class="item-center flex h-8 justify-between">
						{pricing.title}
						{#if pricing.popular === PopularPlanType.YES}
							<Badge variant="secondary" class="text-sm text-orange-500">{m.popular()}</Badge>
						{/if}
					</CardTitle>
					<div>
						<span class="text-3xl font-bold">${pricing.price}</span>
						<span class="text-muted-foreground"> /month</span>
					</div>
					<CardDescription>{pricing.description}</CardDescription>
				</CardHeader>

				<CardContent class="flex-grow">
					<Button class="mt-auto w-full">{pricing.buttonText}</Button>
				</CardContent>

				<hr class="m-auto mb-4 w-4/5" />

				<CardFooter class="flex">
					<div class="space-y-4">
						{#each pricing.benefitList as benefit}
							<span class="flex">
								<Check class="text-green-500" />
								<h3 class="ml-2">{benefit}</h3>
							</span>
						{/each}
					</div>
				</CardFooter>
			</Card>
		{/each}
	</div>
</section>

<style>
	/* Add any additional styling needed here */
</style>
