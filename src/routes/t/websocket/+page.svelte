<script lang="ts">
	import { onMount } from 'svelte';

	let input = '';
	let log = 'Connecting \n';

	let ws: WebSocket;

	onMount(() => {
		ws = new WebSocket('ws://localhost:5173/ws');

		ws.onopen = () => {
			log += 'Connected' + '\n';
		};

		ws.onmessage = (event) => {
			log += 'Message: ' + event.data + '\n';
		};

		ws.onclose = (event) => {
			log += 'Closed: ' + event.code + ' ' + event.reason + '\n';
		};

		ws.onerror = (event) => {
			log += 'Error: ' + event + '\n';
		};
	});

	const send = () => {
		ws.send(input);
		log += 'Sent: ' + input + '\n';
		input = '';
	};
</script>

<input type="text" bind:value={input} />
<button onclick={send}>Send</button>

<textarea bind:value={log} disabled rows={10}></textarea>
