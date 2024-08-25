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
	import TimoOttenImage from '$img/Timo_Otten.jpeg?enhanced';

	import * as m from '$lib/paraglide/messages';
	// Team data
	const teamList = [
		{
			imageUrl: TimoOttenImage,
			name: 'Timo Otten',
			position: 'Full Stack Developer',
			socialNetworks: [
				{ name: 'Linkedin', url: 'http://linkedin.com' },
				{ name: 'Facebook', url: 'https://www.facebook.com/' },
				{ name: 'Instagram', url: 'https://www.instagram.com/' }
			],
			description: m.meText()
		},
		{
			imageUrl: placeHolder100,
			name: 'None',
			position: 'None',
			socialNetworks: [],
			description: 'No team member assigned to this position yet.'
		},
		{
			imageUrl: placeHolder100,
			name: 'None',
			position: 'None',
			socialNetworks: [],
			description: 'No team member assigned to this position yet.'
		},
		{
			imageUrl: placeHolder100,
			name: 'None',
			position: 'None',
			socialNetworks: [],
			description: 'No team member assigned to this position yet.'
		}
	];
</script>

<section id="team" class="container py-24 sm:py-32">
	<h2 class="text-3xl font-bold md:text-4xl">
		<span class="text-orange-500">
			{m.teamTitle()}
		</span>
		{m.crew()}
	</h2>
	<p class="mb-10 mt-4 text-xl text-muted-foreground">
		{m.teamDescription()}
	</p>

	<div class="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
		{#each teamList as { imageUrl, name, position, socialNetworks, description }}
			<Card class="relative mt-8 flex flex-col items-center bg-muted/50">
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
					<p>{description}</p>
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
