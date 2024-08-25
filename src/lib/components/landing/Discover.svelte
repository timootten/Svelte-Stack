<script>
	import * as m from '$lib/paraglide/messages';
	import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

	import placeHolder50 from '$img/placeholder/50.png?enhanced';

	const testimonials = [
		{
			image: placeHolder50,
			name: 'Alice Svelte',
			userName: '@alice_svelte',
			comment: m.testimonial1()
		},
		{
			image: placeHolder50,
			name: 'Bob Developer',
			userName: '@bob_developer',
			comment: m.testimonial2()
		},
		{
			image: placeHolder50,
			name: 'Charlie Coder',
			userName: '@charlie_coder',
			comment: m.testimonial3()
		},
		{
			image: placeHolder50,
			name: 'Dana Designer',
			userName: '@dana_designer',
			comment: m.testimonial4()
		},
		{
			image: placeHolder50,
			name: 'Eve Engineer',
			userName: '@eve_engineer',
			comment: m.testimonial5()
		},
		{
			image: placeHolder50,
			name: 'Frank Frontend',
			userName: '@frank_frontend',
			comment: m.testimonial6()
		}
	];
</script>

<section id="testimonials" class="container py-24 sm:py-32">
	<h2 class="text-3xl font-bold md:text-4xl">
		{m.discoverWhy()}
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			{m.peopleLove()}
		</span>
		{m.companyName()}
	</h2>

	<p class="pb-8 pt-4 text-xl text-muted-foreground">
		{m.testimonialDescription()}
	</p>

	<div
		class="mx-auto grid columns-2 space-y-4 sm:block md:grid-cols-2 lg:columns-3 lg:grid-cols-4 lg:gap-6 lg:space-y-6"
	>
		{#each testimonials as { image, name, userName, comment }}
			<Card class="max-w-md overflow-hidden md:break-inside-avoid">
				<CardHeader class="flex flex-row items-center gap-4 pb-2">
					<Avatar class="h-[50px] w-[50px]">
						<enhanced:img
							alt={name}
							src={image}
							class="aspect-square h-[50px] w-[50px] object-center"
						/>
					</Avatar>

					<div class="flex flex-col">
						<CardTitle class="text-lg">{name}</CardTitle>
						<CardDescription>{userName}</CardDescription>
					</div>
				</CardHeader>

				<CardContent>{comment}</CardContent>
			</Card>
		{/each}
	</div>
</section>
