import { useScreenSize } from '@/shared/libs';
import { AccordionSkeleton } from '@/shared/ui/Accordion';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './FullQuestionsList.module.css';

export const FullQuestionsListSkeleton = () => {
	const { isMobileS, isMobile, isTablet } = useScreenSize();

	return (
		<>
			<div className={styles['questions-list-header']}>
				<TextSkeleton variant={isMobileS ? 'body5-accent' : 'body6'} width={150} />
				{(isMobile || isTablet) && <IconSkeleton size={32} />}
			</div>
			<hr className={styles.divider} />
			{[...Array(10)].map((_, index) => (
				<AccordionSkeleton key={index} />
			))}
		</>
	);
};
