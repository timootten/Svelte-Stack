<script lang="ts">
	import placeHolder50 from '$img/placeholder/50.png?enhanced';

	interface SponsorProps {
		icon: any;
		name: string;
		size: Number;
	}

	const sponsors: SponsorProps[] = [
		{
			icon: placeHolder50,
			size: 34,
			name: 'Sponsor 1'
		},
		{
			icon: placeHolder50,
			size: 34,
			name: 'Sponsor 2'
		},
		{
			icon: placeHolder50,
			size: 34,
			name: 'Sponsor 3'
		},
		{
			icon: placeHolder50,
			size: 34,
			name: 'Sponsor 4'
		},
		{
			icon: placeHolder50,
			size: 34,
			name: 'Sponsor 5'
		},
		{
			icon: placeHolder50,
			size: 34,
			name: 'Sponsor 6'
		}
	];
</script>

<section id="sponsors" class="container pt-24 sm:py-32">
	<h2 class="mb-8 text-center text-xl font-bold text-orange-500 lg:text-2xl">
		Investors and founders
	</h2>

	<div class="flex flex-wrap items-center justify-center gap-4 md:gap-8">
		{#each sponsors as { icon, name, size }}
			<div class="flex items-center gap-1 text-muted-foreground/60">
				<enhanced:img src={icon} alt={name} class="min-h-[50px] min-w-[50px]" />
				<h3 class="text-xl font-bold">{name}</h3>
			</div>
		{/each}
	</div>
</section>
