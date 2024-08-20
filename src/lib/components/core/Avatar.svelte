<script lang="ts">
	import { enhance } from '$app/forms';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '../ui/button';
	import * as m from '$lib/paraglide/messages';

	interface Props {
		avatarUrl: string;
	}

	const { avatarUrl }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" size="icon" class="overflow-hidden rounded-full" builders={[builder]}>
			<img src={avatarUrl} width={40} height={40} alt="Avatar" class="overflow-hidden" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>{m.myAccount()}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href="/dashboard/settings/general">{m.settings()}</DropdownMenu.Item>
		<DropdownMenu.Item>Support</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<form action="/dashboard?/logout" method="post" use:enhance>
			<button type="submit" class="w-full"
				><DropdownMenu.Item>{m.logout()}</DropdownMenu.Item></button
			>
		</form>
	</DropdownMenu.Content>
</DropdownMenu.Root>
