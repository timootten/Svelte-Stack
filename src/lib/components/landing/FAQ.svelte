<script>
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

	// FAQ data
	const FAQList = [
		{
			question: 'Is this template free?',
			answer: 'Yes. It is a free ChadcnUI template.',
			value: 'item-1'
		},
		{
			question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.',
			value: 'item-2'
		},
		{
			question: 'Lorem ipsum dolor sit amet  Consectetur natus dolores minus quibusdam?',
			answer:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis necessitatibus maxime quis ipsa vitae cumque quo?',
			value: 'item-3'
		},
		{
			question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit?',
			answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
			value: 'item-4'
		},
		{
			question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur natus?',
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.',
			value: 'item-5'
		}
	];
</script>

<section id="faq" class="container py-24 sm:py-32">
	<h2 class="mb-4 text-3xl font-bold md:text-4xl">
		Frequently Asked
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Questions
		</span>
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
		Still have questions?
		<a
			rel="noreferrer noopener"
			href="/"
			class="border-primary text-primary transition-all hover:border-b-2"
		>
			Contact us
		</a>
	</h3>
</section>
