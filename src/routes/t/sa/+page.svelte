<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { actions } from './client';

	let data = $state('Not Clicked');
</script>

<span>{data}</span>

<button
	onclick={async () => {
		try {
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
			const user = await actions.getUser({ id: '54' });
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
