<script>
	import { onMount } from 'svelte';
	import { Button } from '../ui/button';
	import { ArrowUpToLine } from 'lucide-svelte';

	let showTopBtn = false;

	const handleScroll = () => {
		if (window.scrollY > 400) {
			showTopBtn = true;
		} else {
			showTopBtn = false;
		}
	};

	const goToTop = () => {
		window.scroll({
			top: 0,
			left: 0
		});
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if showTopBtn}
	<Button on:click={goToTop} class="fixed bottom-4 right-4 opacity-90 shadow-md" size="icon">
		<ArrowUpToLine class="h-4 w-4" />
	</Button>
{/if}
