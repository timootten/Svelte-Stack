<script>
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

	// Import necessary components

	// Enum for PopularPlanType
	const PopularPlanType = {
		NO: 0,
		YES: 1
	};

	// Pricing data
	const pricingList = [
		{
			title: 'Free',
			popular: PopularPlanType.NO,
			price: 0,
			description: 'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
			buttonText: 'Get Started',
			benefitList: [
				'1 Team member',
				'2 GB Storage',
				'Upto 4 pages',
				'Community support',
				'lorem ipsum dolor'
			]
		},
		{
			title: 'Premium',
			popular: PopularPlanType.YES,
			price: 5,
			description: 'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
			buttonText: 'Start Free Trial',
			benefitList: [
				'4 Team member',
				'4 GB Storage',
				'Upto 6 pages',
				'Priority support',
				'lorem ipsum dolor'
			]
		},
		{
			title: 'Enterprise',
			popular: PopularPlanType.NO,
			price: 40,
			description: 'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
			buttonText: 'Contact US',
			benefitList: [
				'10 Team member',
				'8 GB Storage',
				'Upto 10 pages',
				'Priority support',
				'lorem ipsum dolor'
			]
		}
	];
</script>

<section id="pricing" class="container py-24 sm:py-32">
	<h2 class="text-center text-3xl font-bold md:text-4xl">
		Get
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Unlimited
		</span>
		Access
	</h2>
	<h3 class="pb-8 pt-4 text-center text-xl text-muted-foreground">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias reiciendis.
	</h3>
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each pricingList as pricing}
			<Card
				class={pricing.popular === PopularPlanType.YES
					? 'shadow-black/10 drop-shadow-xl dark:shadow-white/10'
					: ''}
			>
				<CardHeader>
					<CardTitle class="item-center flex justify-between">
						{pricing.title}
						{#if pricing.popular === PopularPlanType.YES}
							<Badge variant="secondary" class="text-sm text-primary">Most popular</Badge>
						{/if}
					</CardTitle>
					<div>
						<span class="text-3xl font-bold">${pricing.price}</span>
						<span class="text-muted-foreground"> /month</span>
					</div>
					<CardDescription>{pricing.description}</CardDescription>
				</CardHeader>

				<CardContent>
					<Button class="w-full">{pricing.buttonText}</Button>
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
