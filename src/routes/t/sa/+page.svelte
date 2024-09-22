<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { actions } from './client';

	let data1 = $state('Not Clicked');

	const { data } = $props();

	let test = $state(data.test);
</script>

{#await test}
	Loading
{:then user}
	<p>{JSON.stringify(user)}</p>
{:catch error}
	<p>{error.message}</p>
{/await}

<span>{data1}</span>

<button
	onclick={async () => {
		try {
			test = await actions.test({ message: 'Hello World' }, { test: 'test' });
			const user = await actions.withZod({ message: 'Hello World' });
			console.log('Clicked', user);
			data1 = JSON.stringify(user);
		} catch (error: any) {
			console.log(error);
			if (error instanceof Error) toast.error(error.message);
		}
	}}
>
	Click me
</button>
<button
	onclick={async () => {
		try {
			const user = await actions.test({ message: 'Hello World2' }, { test: 'test' });
			console.log('Clicked', user);
			data1 = JSON.stringify(user);
		} catch (error: any) {
			console.log(error);
			if (error instanceof Error) toast.error(error.message);
		}
	}}
>
	Click me User
</button>
