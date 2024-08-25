<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
	// Replace these imports with links to stock images
	import placeHolder50 from '$img/placeholder/50.png?enhanced';
	import * as m from '$lib/paraglide/messages';
	import { hightlight } from '$lib/utils';

	interface InstallProps {
		icon: any; // Change type to string
		title: string;
		description: string;
	}

	const install: InstallProps[] = [
		{
			icon: placeHolder50,
			title: m.cloneRepositoryStep(),
			description: m.cloneRepositoryDescription()
		},
		{
			icon: placeHolder50,
			title: m.installDependenciesStep(),
			description: m.installDependenciesDescription()
		},
		{
			icon: placeHolder50,
			title: m.runDevelopmentServerStep(),
			description: m.runDevelopmentServerDescription()
		},
		{
			icon: placeHolder50,
			title: m.viewApplicationStep(),
			description: m.viewApplicationDescription()
		}
	];
</script>

<section id="howItWorks" class="container py-24 text-center sm:py-32">
	<h2 class="mb-2 text-3xl font-bold md:text-4xl">
		{@html hightlight(m.howItWorksTitle(), m.works())}
	</h2>
	<span class="text-xl font-bold">{m.howItWorksSubtitle()}</span>
	<p class="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
		{m.howItWorksDescription()}
	</p>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
		{#each install as { icon, title, description }}
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
