<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { actions } from './client';

	let data = $state('Not Clicked');

	let test = $state(actions.test({ message: 'Hello World' }, { test: 'test' }));
</script>

{#await test}
	Loading
{:then user}
	<p>{JSON.stringify(user)}</p>
{:catch error}
	<p>{error.message}</p>
{/await}

<span>{data}</span>

<button
	onclick={async () => {
		try {
			test = actions.test({ message: 'Hello World' }, { test: 'test' });
			const user = await actions.withZod({ message: 'Hello World' });
			console.log('Clicked', user);
			data = JSON.stringify(user);
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
			data = JSON.stringify(user);
		} catch (error: any) {
			console.log(error);
			if (error instanceof Error) toast.error(error.message);
		}
	}}
>
	Click me User
</button>
