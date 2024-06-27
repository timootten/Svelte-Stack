<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$lib/utils.js';

	let {
		class: className = undefined,
		transition = flyAndScale,
		sideOffset = 4,
		transitionConfig = {
			y: 8,
			duration: 150
		},
		children,
		...attr
	}: TooltipPrimitive.ContentProps = $props();
</script>

<TooltipPrimitive.Content
	{transition}
	{transitionConfig}
	{sideOffset}
	class={cn(
		'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
		className
	)}
	{...attr}
>
	{@render children?.()}
</TooltipPrimitive.Content>
