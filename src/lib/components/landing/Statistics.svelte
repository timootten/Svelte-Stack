<script lang="ts">
	interface statsProps {
		quantity: string;
		description: string;
	}

	const stats: statsProps[] = [
		{
			quantity: '2.7K+',
			description: 'Users'
		},
		{
			quantity: '1.8K+',
			description: 'Subscribers'
		},
		{
			quantity: '112',
			description: 'Downloads'
		},
		{
			quantity: '4',
			description: 'Products'
		}
	];
</script>

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
