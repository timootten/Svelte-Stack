<script lang="ts">
	export let data;
</script>

Users: <br />
{#each data.users as user}
	{user.id} | {user.email} - {user.balance} €<br />
{/each}

{data.user?.username}
