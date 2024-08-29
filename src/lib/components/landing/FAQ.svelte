<script>
	import * as m from '$lib/paraglide/messages';
	import { hightlight } from '$lib/utils';
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

	const FAQList = [
		{
			question: m.faqQuestion1(),
			answer: m.faqAnswer1(),
			value: 'item-1'
		},
		{
			question: m.faqQuestion2(),
			answer: m.faqAnswer2(),
			value: 'item-2'
		},
		{
			question: m.faqQuestion3(),
			answer: m.faqAnswer3(),
			value: 'item-3'
		},
		{
			question: m.faqQuestion4(),
			answer: m.faqAnswer4(),
			value: 'item-4'
		},
		{
			question: m.faqQuestion5(),
			answer: m.faqAnswer5(),
			value: 'item-5'
		}
	];
</script>

<section id="faq" class="container py-24 sm:py-32">
	<h2 class="mb-4 text-3xl font-bold md:text-4xl">
		{@html hightlight(m.faqTitle(), m.questions())}
	</h2>

	<Accordion class="AccordionRoot w-full">
		{#each FAQList as { question, answer, value }}
			<AccordionItem {value}>
				<AccordionTrigger class="text-left">
					{question}
				</AccordionTrigger>
				<AccordionContent>{answer}</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>

	<h3 class="mt-4 font-medium">
		{m.stillHaveQuestions()}
		<a
			rel="noreferrer noopener"
			href="mailto:Admin@ShadeHost.eu"
			class="border-primary font-bold transition-all hover:border-b-2"
		>
			{@html hightlight(m.contactUs())}
		</a>
	</h3>
</section>
