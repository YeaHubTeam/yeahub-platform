import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { AccordionSkeleton } from '@/shared/ui/Accordion';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './FullQuestionsList.module.css';

export const FullQuestionsListSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<>
			<TextSkeleton variant={isMobileS ? 'body5-accent' : 'body6'} width={150} />
			<hr className={styles.divider} />
			{[...Array(10)].map((_, index) => (
				<AccordionSkeleton key={index} />
			))}
		</>
	);
};
