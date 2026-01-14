import { AccordionSkeleton } from '@/shared/ui/Accordion';

export const FullQuestionsListSkeleton = () => {
	return (
		<>
			{[...Array(10)].map((_, index) => (
				<AccordionSkeleton key={index} />
			))}
		</>
	);
};
