<script lang="ts">
	import Statistics from './Statistics.svelte';
	const pilot = 'https://source.unsplash.com/300x200/?airplane';
</script>

<section id="about" class="container py-24 sm:py-32">
	<div class="rounded-lg border bg-muted/50 py-12">
		<div class="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
			<img src={pilot} alt="" class="w-[300px] rounded-lg object-contain" />
			<div class="bg-green-0 flex flex-col justify-between">
				<div class="pb-6">
					<h2 class="text-3xl font-bold md:text-4xl">
						<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
							About
						</span>
						Company
					</h2>
					<p class="mt-4 text-xl text-muted-foreground">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor
						sit amet, consectetur adipiscing elit.
					</p>
				</div>

				<Statistics />
			</div>
		</div>
	</div>
</section>
