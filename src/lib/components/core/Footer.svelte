<script lang="ts">
	import * as m from '$lib/paraglide/messages';

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
			title: m.platforms(),
			links: [
				{ href: '#', label: 'Web' },
				{ href: '#', label: 'Mobile' },
				{ href: '#', label: 'Desktop' }
			]
		},
		{
			title: m.about(),
			links: [
				{ href: '/#features', label: m.features() },
				{ href: '/#pricing', label: m.pricing() },
				{ href: '/#faq', label: m.faq() }
			]
		},
		{
			title: m.rights(),
			links: [
				{ href: '/rights/imprint', label: m.imprint() },
				{ href: '/rights/privacy', label: m.privacyPolicy() },
				{ href: '/rights/terms', label: m.termsConditions() }
			]
		}
	];
</script>

<footer id="footer">
	<section class="container grid grid-cols-2 gap-x-12 gap-y-8 py-10 md:grid-cols-4 xl:grid-cols-6">
		<div class="col-span-full xl:col-span-2">
			<a rel="noreferrer noopener" href="/" class="flex text-xl font-bold">
				<enhanced:img src="$img/favicon.png?w=32&h=32&enhanced" class="mr-2 h-8" alt="Logo" />
				{m.companyName()}
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
		<h3>&copy; 2024 {m.companyName()}</h3>
	</section>
</footer>
