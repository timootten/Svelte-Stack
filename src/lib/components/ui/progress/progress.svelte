<script lang="ts">
	import { Progress as ProgressPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value,
		text,
		classLoader,
		...restProps
	}: WithoutChildrenOrChild<ProgressPrimitive.RootProps> & {
		text?: string;
		classLoader?: string;
	} = $props();
</script>

<ProgressPrimitive.Root
	bind:ref
	class={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
	{value}
	{max}
	{...restProps}
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
