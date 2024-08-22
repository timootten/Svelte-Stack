<script lang="ts">
	import { Facebook, Instagram, Linkedin } from '../icons';
	import { buttonVariants } from '../ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '../ui/card';

	const icons: any = {
		Facebook: Facebook,
		Linkedin: Linkedin,
		Instagram: Instagram
	};

	import placeHolder100 from '$img/placeholder/100.png?enhanced';

	// Team data
	const teamList = [
		{
			imageUrl: placeHolder100,
			name: 'Emma Smith',
			position: 'Product Manager',
			socialNetworks: [
				{ name: 'Linkedin', url: 'http://linkedin.com' },
				{ name: 'Facebook', url: 'https://www.facebook.com/' },
				{ name: 'Instagram', url: 'https://www.instagram.com/' }
			]
		},
		{
			imageUrl: placeHolder100,
			name: 'John Doe',
			position: 'Tech Lead',
			socialNetworks: [
				{ name: 'Linkedin', url: 'http://linkedin.com' },
				{ name: 'Facebook', url: 'https://www.facebook.com/' },
				{ name: 'Instagram', url: 'https://www.instagram.com/' }
			]
		},
		{
			imageUrl: placeHolder100,
			name: 'Ashley Ross',
			position: 'Frontend Developer',
			socialNetworks: [
				{ name: 'Linkedin', url: 'http://linkedin.com' },
				{ name: 'Instagram', url: 'https://www.instagram.com/' }
			]
		},
		{
			imageUrl: placeHolder100,
			name: 'Bruce Rogers',
			position: 'Backend Developer',
			socialNetworks: [
				{ name: 'Linkedin', url: 'http://linkedin.com' },
				{ name: 'Facebook', url: 'https://www.facebook.com/' }
			]
		}
	];
</script>

<section id="team" class="container py-24 sm:py-32">
	<h2 class="text-3xl font-bold md:text-4xl">
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Our Dedicated
		</span>
		Crew
	</h2>
	<p class="mb-10 mt-4 text-xl text-muted-foreground">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor pariatur sit!
	</p>

	<div class="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
		{#each teamList as { imageUrl, name, position, socialNetworks }}
			<Card class="relative mt-8 flex flex-col items-center justify-center bg-muted/50">
				<CardHeader class="mt-8 flex items-center justify-center pb-2">
					<div class="absolute -top-12 h-24 w-24">
						<enhanced:img
							src={imageUrl}
							alt="{name} {position}"
							class="aspect-square rounded-full object-cover"
						/>
					</div>
					<CardTitle class="text-center">{name}</CardTitle>
					<CardDescription class="text-orange-500">{position}</CardDescription>
				</CardHeader>
				<CardContent class="pb-2 text-center">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				</CardContent>
				<CardFooter>
					{#each socialNetworks as { name, url }}
						{@const Icon = icons[name]}
						<div>
							<a
								rel="noreferrer noopener"
								href={url}
								target="_blank"
								class={buttonVariants({ variant: 'ghost', size: 'sm' })}
							>
								<span class="sr-only">{name} icon</span>
								<Icon />
							</a>
						</div>
					{/each}
				</CardFooter>
			</Card>
		{/each}
	</div>
</section>
