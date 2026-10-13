import { AccordionSkeleton } from '@/shared/ui/Accordion';

import styles from './FullQuestionsList.module.css';

export const FullQuestionsListSkeleton = () => {
	return (
		<>
			{[...Array(10)].map((_, index) => (
				<AccordionSkeleton key={index} className={styles.gap} />
			))}
		</>
	);
};
