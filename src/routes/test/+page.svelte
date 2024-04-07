<script lang="ts">
	export let data;
</script>

Users: <br />
{#each data.users as user}
	{user.id} | {user.firstName} {user.lastName} <br />
{/each}
