<script lang="ts">
	import type { Option, TurnstileSize, TurnstileTheme } from './types';
	import type { SupportedLanguages } from './types';
	import { onMount } from 'svelte';
	import type { Action } from 'svelte/action';

	let loaded = $state(hasTurnstile());
	let mounted = $state(false);

	let widgetId: string;

	interface Props {
		reset?: () => void;
		turnstileCallback?: ({ token }: { token: string }) => void;
		turnstileError?: ({}) => void;
		turnstileExpired?: ({}) => void;
		turnstileTimeout?: ({}) => void;
		siteKey: string;
		appearance?: Option<'appearance'>;
		language?: SupportedLanguages | 'auto';
		formsField?: string;
		execution?: Option<'execution'>;
		action?: string | undefined;
		cData?: string | undefined;
		retryInterval?: number | undefined;
		retry?: Option<'retry'>;
		theme?: TurnstileTheme;
		size?: TurnstileSize;
		forms?: boolean;
		tabIndex?: number;
	}

	let {
		reset = $bindable(),
		turnstileCallback,
		turnstileError,
		turnstileExpired,
		turnstileTimeout,
		siteKey,
		appearance = 'always',
		language = 'auto',
		formsField = 'cf-turnstile-response',
		execution = 'render',
		action = undefined,
		cData = undefined,
		retryInterval = 8000,
		retry = 'auto',
		theme = 'auto',
		size = 'normal',
		forms = true,
		tabIndex = 0,
		...attr
	}: Props = $props();

	onMount(() => {
		mounted = true;

		if (!loaded) {
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
			script.async = true;
			script.addEventListener('load', loadCallback);
			document.head.appendChild(script);
		}

		return () => {
			mounted = false;
		};
	});

	function hasTurnstile() {
		if (typeof window == 'undefined') return null;
		return 'turnstile' in window;
	}

	function loadCallback() {
		loaded = true;
	}

	function error() {
		turnstileError?.({});
	}

	function expired() {
		turnstileExpired?.({});
	}

	function timeout() {
		turnstileTimeout?.({});
	}

	function callback(token: string) {
		turnstileCallback?.({ token });
	}

	reset = () => {
		window.turnstile.reset(widgetId);
	};

	const turnstile: Action = (node) => {
		const id = window.turnstile.render(node, {
			'timeout-callback': timeout,
			'expired-callback': expired,
			'error-callback': error,
			callback,
			sitekey: siteKey,
			'response-field-name': formsField,
			'retry-interval': retryInterval,
			'response-field': forms,
			tabindex: tabIndex,
			appearance,
			execution,
			language,
			action,
			retry,
			theme,
			cData,
			size
		});

		widgetId = id;

		return {
			destroy: () => {
				window.turnstile.remove(id);
			}
		};
	};
</script>

{#if loaded && mounted}
	{#key attr}
		<div use:turnstile></div>
	{/key}
{/if}
