<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Badge } from '../ui/badge';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
	import placeHolder200 from '$img/placeholder/200.png?enhanced';
	import { hightlight } from '$lib/utils';

	interface FeatureProps {
		title: string;
		description: string;
		image: any;
	}

	const features: FeatureProps[] = [
		{
			image: placeHolder200,
			title: m.accessibility(),
			description: m.accessibilityDescription()
		},
		{
			image: placeHolder200,
			title: m.performance(),
			description: m.performanceDescription()
		},
		{
			image: placeHolder200,
			title: m.security(),
			description: m.securityDescription()
		},
		{
			image: placeHolder200,
			title: m.customization(),
			description: m.customizationDescription()
		}
	];

	const featureList: string[] = [
		m.themeSwitching(),
		m.toastNotifications(),
		m.uiComponents(),
		m.emailFunctionality(),
		m.databaseIntegration(),
		m.authentication(),
		m.responsiveDesign(),
		m.manyFeatures(),
		m.tinyBundleSize()
	];
</script>

<section id="features" class="container space-y-8 py-24 sm:py-32">
	<h2 class="text-3xl font-bold md:text-center lg:text-4xl">
		{@html hightlight(m.greatFeaturesTitle(), m.features())}
	</h2>

	<div class="flex flex-wrap gap-4 md:justify-center">
		{#each featureList as feature (feature)}
			<div>
				<Badge variant="secondary" class="text-sm">{feature}</Badge>
			</div>
		{/each}
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
