<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import placeHolder300 from '$img/placeholder/300.png?enhanced';
	import { hightlight } from '$lib/utils';

	interface statsProps {
		quantity: string;
		description: string;
	}

	const stats: statsProps[] = [
		{
			quantity: '13+',
			description: m.components()
		},
		{
			quantity: '2+',
			description: m.supportedLanguages()
		},
		{
			quantity: '10+',
			description: m.integratedFeatures()
		},
		{
			quantity: '2',
			description: m.themes()
		}
	];
</script>

<section id="about" class="container py-24 sm:py-32">
	<div class="rounded-lg border bg-muted/50 py-6">
		<div class="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
			<div class="my-auto w-full lg:w-1/2">
				<enhanced:img
					src={placeHolder300}
					alt="About"
					class="mx-auto w-[300px] rounded-lg object-contain"
					sizes="min(300px)"
				/>
			</div>
			<div class="bg-green-0 flex flex-col justify-between">
				<div class="pb-6">
					<h2 class="text-3xl font-bold md:text-4xl">
						{@html hightlight(m.about())}
						{m.companyName()}
					</h2>
					<p class="mt-4 text-xl text-muted-foreground">
						{m.aboutDescription()}
					</p>
				</div>

				<section id="statistics">
					<div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
						{#each stats as { quantity, description }}
							<div class="space-y-2 text-center">
								<h2 class="text-3xl font-bold sm:text-4xl">{quantity}</h2>
								<p class="text-xl text-muted-foreground">{description}</p>
							</div>
						{/each}
					</div>
				</section>
			</div>
		</div>
	</div>
</section>
