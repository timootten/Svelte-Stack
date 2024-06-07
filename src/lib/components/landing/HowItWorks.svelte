<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
	// Replace these imports with links to stock images
	const MedalIcon = 'https://via.placeholder.com/50';
	const MapIcon = 'https://via.placeholder.com/50';
	const PlaneIcon = 'https://via.placeholder.com/50';
	const GiftIcon = 'https://via.placeholder.com/50';

	interface FeatureProps {
		icon: string; // Change type to string
		title: string;
		description: string;
	}

	const features: FeatureProps[] = [
		{
			icon: MedalIcon,
			title: 'Accessibility',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum'
		},
		{
			icon: MapIcon,
			title: 'Community',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum'
		},
		{
			icon: PlaneIcon,
			title: 'Scalability',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum'
		},
		{
			icon: GiftIcon,
			title: 'Gamification',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum'
		}
	];
</script>

<section id="howItWorks" class="container py-24 text-center sm:py-32">
	<h2 class="text-3xl font-bold md:text-4xl">
		How It
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Works
		</span>
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
						<img src={icon} alt={title} />
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent>{description}</CardContent>
			</Card>
		{/each}
	</div>
</section>
