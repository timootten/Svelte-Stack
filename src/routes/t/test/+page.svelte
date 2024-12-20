<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';

	let { data } = $props();
</script>

<a href="/t/test">Test</a>
<a href="/t/test2">Test2</a>
<br />
<h1>Test</h1>
Users:<br />
{#await data.users}
	Loading
{:then users}
	{#each users as user}
		{user.id} | {user.email} - {user.balance} €<br />
	{/each}
{/await}
<br />
You: {data.user?.username} | {data.user?.email} - {data.user?.balance} €<br />
