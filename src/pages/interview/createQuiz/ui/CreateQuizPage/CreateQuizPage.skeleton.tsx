import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { TextSkeleton } from '@/shared/ui/Text';

import { CreateQuizFiltersSkeleton } from '@/widgets/interview/CreateQuizFilters';

import styles from './CreateQuizPage.module.css';

export const CreateQuizPageSkeleton = () => {
	return (
		<section>
			<CardSkeleton className={styles.container}>
				<TextSkeleton variant="body6" className={styles.title} width={200} />
				<CreateQuizFiltersSkeleton />
				<ButtonSkeleton width={150} className={styles.button} />
			</CardSkeleton>
		</section>
	);
};
