<script lang="ts">
	import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
	const MagnifierIcon = 'https://via.placeholder.com/50';
	const WalletIcon = 'https://via.placeholder.com/50';
	const ChartIcon = 'https://via.placeholder.com/50';

	interface ServiceProps {
		title: string;
		description: string;
		icon: string;
	}

	const serviceList: ServiceProps[] = [
		{
			title: 'Code Collaboration',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			icon: MagnifierIcon
		},
		{
			title: 'Project Management',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			icon: WalletIcon
		},
		{
			title: 'Task Automation',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			icon: ChartIcon
		}
	];
</script>

<section class="container py-24 sm:py-32">
	<div class="grid place-items-center gap-8 lg:grid-cols-[1fr,1fr]">
		<div>
			<h2 class="text-3xl font-bold md:text-4xl">
				<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
					Client-Centric{' '}
				</span>
				Services
			</h2>

			<p class="mb-8 mt-4 text-xl text-muted-foreground">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor.
			</p>

			<div class="flex flex-col gap-8">
				{#each serviceList as { icon, title, description }}
					<Card>
						<CardHeader class="flex items-start justify-start gap-4 space-y-1 md:flex-row">
							<div class="mt-1 rounded-2xl bg-primary/20 p-1">
								<img src={icon} alt={title} />
							</div>
							<div>
								<CardTitle>{title}</CardTitle>
								<CardDescription class="text-md mt-2">
									{description}
								</CardDescription>
							</div>
						</CardHeader>
					</Card>
				{/each}
			</div>
		</div>

		<img
			src={ChartIcon}
			class="w-[300px] object-contain md:w-[500px] lg:w-[600px]"
			alt="About services"
		/>
	</div>
</section>
