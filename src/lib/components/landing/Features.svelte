<script lang="ts">
	import { Badge } from '../ui/badge';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
	import placeHolder200 from '$img/placeholder/200.png?enhanced';

	interface FeatureProps {
		title: string;
		description: string;
		image: any;
	}

	const features: FeatureProps[] = [
		{
			title: 'Responsive Design',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			image: placeHolder200
		},
		{
			title: 'Intuitive user interface',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			image: placeHolder200
		},
		{
			title: 'AI-Powered insights',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			image: placeHolder200
		}
	];

	const featureList: string[] = [
		'Dark/Light theme',
		'Reviews',
		'Features',
		'Pricing',
		'Contact form',
		'Our team',
		'Responsive design',
		'Newsletter',
		'Minimalist'
	];
</script>

<section id="features" class="container space-y-8 py-24 sm:py-32">
	<h2 class="text-3xl font-bold md:text-center lg:text-4xl">
		Many{' '}
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Great Features
		</span>
	</h2>

	<div class="flex flex-wrap gap-4 md:justify-center">
		{#each featureList as feature (feature)}
			<div>
				<Badge variant="secondary" class="text-sm">{feature}</Badge>
			</div>
		{/each}
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each features as { title, description, image }}
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>

				<CardContent>{description}</CardContent>

				<CardFooter>
					<div class="mx-auto">
						<enhanced:img src={image} alt="About feature" />
					</div>
				</CardFooter>
			</Card>
		{/each}
	</div>
</section>
