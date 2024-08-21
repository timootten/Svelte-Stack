<script lang="ts">
	const footerLinks = [
		{
			title: 'Social Media',
			links: [
				{ href: '#', label: 'GitHub' },
				{ href: '#', label: 'Discord' },
				{ href: '#', label: 'X (Twitter)' }
			]
		},
		{
			title: 'Platforms',
			links: [
				{ href: '#', label: 'Web' },
				{ href: '#', label: 'Mobile' },
				{ href: '#', label: 'Desktop' }
			]
		},
		{
			title: 'About',
			links: [
				{ href: '#', label: 'Features' },
				{ href: '#', label: 'Pricing' },
				{ href: '#', label: 'FAQ' }
			]
		},
		{
			title: 'Rights',
			links: [
				{ href: '/rights/imprint', label: 'Imprint' },
				{ href: '/rights/privacy', label: 'Privacy Policy' },
				{ href: '/rights/terms', label: 'Terms & Conditions' }
			]
		}
	];
</script>

<footer id="footer">
	<section class="container grid grid-cols-2 gap-x-12 gap-y-8 py-10 md:grid-cols-4 xl:grid-cols-6">
		<div class="col-span-full xl:col-span-2">
			<a rel="noreferrer noopener" href="/" class="flex text-xl font-bold">
				<enhanced:img src="$img/favicon.png?w=32&h=32&enhanced" class="mr-2 h-8" alt="Logo" />
				Svelte-Stack
			</a>
		</div>

		{#each footerLinks as { title, links }}
			<div class="flex flex-col gap-2">
				<h3 class="text-lg font-bold">{title}</h3>
				{#each links as { href, label }}
					<div>
						<a rel="noreferrer noopener" {href} class="opacity-60 hover:opacity-100">{label}</a>
					</div>
				{/each}
			</div>
		{/each}
	</section>

	<section class="container pb-8 text-center">
		<h3>&copy; 2024 Svelte-Stack</h3>
	</section>
</footer>
