<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
	// Replace these imports with links to stock images
	import placeHolder50 from '$img/placeholder/50.png?enhanced';

	interface FeatureProps {
		icon: any; // Change type to string
		title: string;
		description: string;
	}

	const features: FeatureProps[] = [
		{
			icon: placeHolder50,
			title: 'Accessibility',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum'
		},
		{
			icon: placeHolder50,
			title: 'Community',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum'
		},
		{
			icon: placeHolder50,
			title: 'Scalability',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum'
		},
		{
			icon: placeHolder50,
			title: 'Gamification',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum'
		}
	];
</script>

<section id="howItWorks" class="container py-24 text-center sm:py-32">
	<h2 class="text-3xl font-bold md:text-4xl">
		How It
		<span class="text-orange-500 text-transparent"> Works </span>
		Step-by-Step Guide
	</h2>
	<p class="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor pariatur sit!
	</p>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
		{#each features as { icon, title, description }}
			<Card class="bg-muted/50">
				<CardHeader>
					<CardTitle class="grid place-items-center gap-4">
						<enhanced:img src={icon} alt={title} />
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent>{description}</CardContent>
			</Card>
		{/each}
	</div>
</section>
