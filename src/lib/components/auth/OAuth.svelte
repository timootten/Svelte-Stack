<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { enhance } from '$app/forms';

	let githubLoading = $state(false);
	let googleLoading = $state(false);
</script>

<div class="flex justify-between gap-x-2">
	<form
		class="w-full"
		action="/auth/login?/github"
		method="POST"
		use:enhance={() => {
			githubLoading = true;
		}}
	>
		<Button type="submit" variant="secondary" loading={githubLoading} class="mb-4 h-12 w-full"
			><img
				class="hidden p-2 dark:block"
				src="/img/oauth/GitHub-White.svg"
				alt="GitHub Logo"
				width="48px"
				height="48px"
			/>
			<img
				class="block p-2 dark:hidden"
				src="/img/oauth/GitHub.svg"
				alt="GitHub Logo"
				width="48px"
				height="48px"
			/>
			GitHub</Button
		>
	</form>
	<form
		class="w-full"
		action="/auth/login?/google"
		method="POST"
		use:enhance={() => {
			googleLoading = true;
		}}
	>
		<Button type="submit" variant="secondary" loading={googleLoading} class="mb-4 h-12 w-full"
			><img
				class="p-2"
				src="/img/oauth/Google.svg"
				alt="Google Logo"
				width="48px"
				height="48px"
			/>Google</Button
		>
	</form>
</div>
