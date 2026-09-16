import { CounterSkeleton } from '@/shared/ui/Counter';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ChooseQuestionCount.module.css';

export const ChooseQuestionCountSkeleton = () => {
	return (
		<div style={{ maxWidth: '290px' }}>
			<TextSkeleton className={styles.title} variant="body3" width={200} />
			<CounterSkeleton />
		</div>
	);
};
