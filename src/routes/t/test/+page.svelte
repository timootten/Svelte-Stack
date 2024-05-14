<script lang="ts">
	export let data;
</script>

<a href="/t/test">Test</a>
<a href="/t/test2">Test2</a>
<br />
<h1>Test</h1>
Users:<br />
{#each data.users as user}
	{user.id} | {user.email} - {user.balance} €<br />
{/each}
<br />
You: {data.user?.username} | {data.user?.email} - {data.user?.balance} €<br />
