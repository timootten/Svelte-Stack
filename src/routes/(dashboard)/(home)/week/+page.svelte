<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import Copy from 'lucide-svelte/icons/copy';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import File from 'lucide-svelte/icons/file';
	import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Truck from 'lucide-svelte/icons/truck';
	import UsersRound from 'lucide-svelte/icons/users-round';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
</script>

<Tabs.Root value="week">
	<div class="flex items-center">
		<Tabs.List>
			<Tabs.Trigger value="week">Week</Tabs.Trigger>
			<Tabs.Trigger value="month">Month</Tabs.Trigger>
			<Tabs.Trigger value="year">Year</Tabs.Trigger>
		</Tabs.List>
		<div class="ml-auto flex items-center gap-2">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" size="sm" class="h-7 gap-1 text-sm" builders={[builder]}>
						<ListFilter class="h-3.5 w-3.5" />
						<span class="sr-only md:not-sr-only">Filter</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>Filter by</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.CheckboxItem checked>Fulfilled</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem>Declined</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem>Refunded</DropdownMenu.CheckboxItem>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
				<File class="h-3.5 w-3.5" />
				<span class="sr-only md:not-sr-only">Export</span>
			</Button>
		</div>
	</div>
	<Tabs.Content value="week">
		<Card.Root>
			<Card.Header class="px-7">
				<Card.Title>Orders</Card.Title>
				<Card.Description>Recent orders from your store.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Customer</Table.Head>
							<Table.Head class="hidden md:table-cell">Type</Table.Head>
							<Table.Head class="hidden md:table-cell">Status</Table.Head>
							<Table.Head class="hidden md:table-cell">Date</Table.Head>
							<Table.Head class="text-right">Amount</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row class="bg-accent">
							<Table.Cell>
								<div class="font-medium">Liam Johnson</div>
								<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
							<Table.Cell class="text-right">$250.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Olivia Smith</div>
								<div class="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">Refund</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge class="text-xs" variant="outline">Declined</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
							<Table.Cell class="text-right">$150.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Noah Williams</div>
								<div class="hidden text-sm text-muted-foreground md:inline">noah@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">Subscription</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-25</Table.Cell>
							<Table.Cell class="text-right">$350.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Emma Brown</div>
								<div class="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-26</Table.Cell>
							<Table.Cell class="text-right">$450.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Liam Johnson</div>
								<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
							<Table.Cell class="text-right">$250.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Liam Johnson</div>
								<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
							<Table.Cell class="text-right">$250.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Olivia Smith</div>
								<div class="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">Refund</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge class="text-xs" variant="outline">Declined</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
							<Table.Cell class="text-right">$150.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Emma Brown</div>
								<div class="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">Sale</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
							</Table.Cell>
							<Table.Cell class="hidden md:table-cell">2023-06-26</Table.Cell>
							<Table.Cell class="text-right">$450.00</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
