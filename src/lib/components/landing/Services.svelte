<script lang="ts">
	import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
	import placeHolder50 from '$img/placeholder/50.png?enhanced';
	import placeHolder500 from '$img/placeholder/500.png?enhanced';
	import * as m from '$lib/paraglide/messages';
	import { hightlight } from '$lib/utils';

	interface ServiceProps {
		title: string;
		description: string;
		icon: any;
	}

	const serviceList: ServiceProps[] = [
		{
			title: m.multipleLanguagesSupport(),
			description: m.multipleLanguagesSupportDescription(),
			icon: placeHolder50
		},
		{
			title: m.themeSwitching(),
			description: m.themeSwitchingDescription(),
			icon: placeHolder50
		},
		{
			title: m.authenticationSystem(),
			description: m.authenticationSystemDescription(),
			icon: placeHolder50
		}
	];
</script>

<section class="container py-24 sm:py-32">
	<div class="grid place-items-center gap-8 lg:grid-cols-[1fr,1fr]">
		<div>
			<h2 class="text-3xl font-bold md:text-4xl">
				{@html hightlight(m.clientCentricTitle(), m.clientCentric())}
			</h2>

			<p class="mb-8 mt-4 text-xl text-muted-foreground">
				{m.servicesDescription()}
			</p>

			<div class="flex flex-col gap-8">
				{#each serviceList as { icon, title, description }}
					<Card>
						<CardHeader class="flex items-start justify-start gap-4 space-y-1 md:flex-row">
							<div class="mt-1 flex rounded-2xl bg-primary/20">
								<div class="h-[50px] w-[50px]">
									<enhanced:img src={icon} alt={title} class="h-[50px] w-[50px] object-cover" />
								</div>
							</div>
							<div>
								<CardTitle>{title}</CardTitle>
								<CardDescription class="text-md mt-2">
									{description}
								</CardDescription>
							</div>
						</CardHeader>
					</Card>
				{/each}
			</div>
		</div>

		<enhanced:img
			src={placeHolder500}
			class="w-[300px] object-contain md:w-[500px] lg:w-[600px]"
			alt="About services"
			sizes="min(300px)"
		/>
	</div>
</section>
