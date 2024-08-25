<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Button } from '../ui/button';
</script>

<section id="cta" class="my-24 bg-muted/50 py-16 sm:my-32">
	<div class="container place-items-center lg:grid lg:grid-cols-2">
		<div class="lg:col-start-1">
			<h2 class="text-3xl font-bold md:text-4xl">
				{m.allYour()}
				<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
					{m.ideasAndConcepts()}
				</span>
				{m.inOneInterface()}
			</h2>
			<p class="mb-8 mt-4 text-xl text-muted-foreground lg:mb-0">
				{m.conceptsDescription()}
			</p>
		</div>

		<div class="space-y-4 lg:col-start-2">
			<Button
				class="w-full md:mr-4 md:w-auto"
				target="_blank"
				href="https://github.com/timootten/Svelte-Stack">{m.cloneRepository()}</Button
			>
			<Button variant="outline" class="w-full md:w-auto" href="/#features"
				>{m.viewAllFeatures()}</Button
			>
		</div>
	</div>
</section>
