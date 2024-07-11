<script lang="ts">
	import { cn } from '$lib/utils';
	import { Progress } from '../ui/progress';

	let { score = 0 }: { score: number } = $props();
</script>

<Progress
	value={score * 25}
	text={score === 0
		? 'Very weak'
		: score === 1
			? 'Weak'
			: score === 2
				? 'Medium'
				: score === 3
					? 'Strong'
					: 'Very strong'}
	class="h-7 font-bold"
	classLoader={cn('bg-red-500', null, {
		'bg-red-500': score === 1,
		'bg-yellow-500': score === 2,
		'bg-green-500': score === 3,
		'bg-emerald-800': score === 4
	})}
/>
