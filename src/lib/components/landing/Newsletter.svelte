<script lang="ts">
	import { Button } from '../ui/button';
	import { Input } from '../ui/input';

	// Handle form submission
	const handleSubmit = (e: Event) => {
		e.preventDefault();
	};
</script>

<section id="newsletter">
	<hr class="mx-auto w-11/12" />

	<div class="container py-24 sm:py-32">
		<h3 class="text-center text-4xl font-bold md:text-5xl">
			Join Our Daily
			<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
				Newsletter
			</span>
		</h3>
		<p class="mb-8 mt-4 text-center text-xl text-muted-foreground">
			Lorem ipsum dolor sit amet consectetur.
		</p>

		<form
			class="mx-auto flex w-full flex-col gap-4 md:w-6/12 md:flex-row md:gap-2 lg:w-4/12"
			on:submit={handleSubmit}
		>
			<Input
				placeholder="leomirandadev@gmail.com"
				class="bg-muted/50 dark:bg-muted/80"
				aria-label="email"
			/>
			<Button type="submit">Subscribe</Button>
		</form>
	</div>

	<hr class="mx-auto w-11/12" />
</section>
