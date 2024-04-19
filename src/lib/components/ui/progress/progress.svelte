<script lang="ts">
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = ProgressPrimitive.Props & {
		classLoader?: string | null | undefined;
		text?: string | null | undefined;
	};

	let className: $$Props['class'] = undefined;
	export let max: $$Props['max'] = 100;
	export let value: $$Props['value'] = undefined;
	export { className as class };
	export let classLoader: string | null | undefined = undefined;
	export let text: string | null | undefined = undefined;
</script>

<ProgressPrimitive.Root
	class={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
	{...$$restProps}
>
	<div
		class={cn('h-full w-full flex-1 bg-primary transition-all', classLoader)}
		style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
	/>
	{#if text}
		<div class="absolute inset-0 flex items-center justify-center text-sm text-white">
			{text}
		</div>
	{/if}
</ProgressPrimitive.Root>
