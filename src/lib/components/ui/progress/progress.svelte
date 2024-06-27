<script lang="ts">
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	interface Props {
		classLoader?: string | null | undefined;
		text?: string | null | undefined;
	}

	let {
		class: className = undefined,
		max = 100,
		value = undefined,
		classLoader = undefined,
		text = undefined,
		...attr
	}: ProgressPrimitive.Props & Props = $props();
</script>

<ProgressPrimitive.Root
	class={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
	{...attr}
>
	<div
		class={cn('h-full w-full flex-1 bg-primary transition-all', classLoader)}
		style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
	></div>
	{#if text}
		<div class="absolute inset-0 flex items-center justify-center text-sm text-white">
			{text}
		</div>
	{/if}
</ProgressPrimitive.Root>
