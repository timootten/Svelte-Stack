<script lang="ts">
	export let data;
</script>

Users: <br />
{#each data.users as user}
	{user.id} | {user.email} - {user.balance} €<br />
{/each}
<br />
You: {data.user?.username} | {data.user?.email} - {data.user?.balance} €<br />
