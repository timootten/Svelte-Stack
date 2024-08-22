<script>
	// Import necessary Svelte components
	import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

	import placeHolder50 from '$img/placeholder/50.png?enhanced';

	// Define the testimonial data
	const testimonials = [
		{
			image: placeHolder50,
			name: 'John Doe Svelte',
			userName: '@john_Doe',
			comment: 'This landing page is awesome!'
		},
		{
			image: placeHolder50,
			name: 'John Doe Svelte',
			userName: '@john_Doe1',
			comment:
				'Lorem ipsum dolor sit amet,empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
		},
		{
			image: placeHolder50,
			name: 'John Doe Svelte',
			userName: '@john_Doe2',
			comment:
				'Lorem ipsum dolor sit amet,exercitation. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
		},
		{
			image: placeHolder50,
			name: 'John Doe Svelte',
			userName: '@john_Doe3',
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
		},
		{
			image: placeHolder50,
			name: 'John Doe Svelte',
			userName: '@john_Doe4',
			comment:
				'Lorem ipsum dolor sit amet, tempor incididunt  aliqua. Ut enim ad minim veniam, quis nostrud.'
		},
		{
			image: placeHolder50,
			name: 'John Doe Svelte',
			userName: '@john_Doe5',
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		}
	];
</script>

<section id="testimonials" class="container py-24 sm:py-32">
	<h2 class="text-3xl font-bold md:text-4xl">
		Discover Why
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			{' '}
			People Love{' '}
		</span>
		This Landing Page
	</h2>

	<p class="pb-8 pt-4 text-xl text-muted-foreground">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error facere hic reiciendis
		illo
	</p>

	<div
		class="mx-auto grid columns-2 space-y-4 sm:block md:grid-cols-2 lg:columns-3 lg:grid-cols-4 lg:gap-6 lg:space-y-6"
	>
		{#each testimonials as { image, name, userName, comment }}
			<Card class="max-w-md overflow-hidden md:break-inside-avoid">
				<CardHeader class="flex flex-row items-center gap-4 pb-2">
					<Avatar>
						<enhanced:img alt="John Doe" src="$img/placeholder/50.png?w=50&h=50&enhanced" />
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
