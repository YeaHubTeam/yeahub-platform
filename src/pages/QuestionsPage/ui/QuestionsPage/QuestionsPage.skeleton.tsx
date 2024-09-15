import { Block } from '@/shared/ui/Block';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './QuestionsPage.module.css';

export const QuestionsPageSkeleton = () => {
	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Block className={styles.content}>
					<Skeleton style={{ margin: '0.67em 0' }} height={33} />
					<hr className={styles.divider} />
					{[...Array(6)].map((_, i) => (
						<div key={i} className={styles['question-skeleton']}>
							<Skeleton height={24} />
						</div>
					))}
				</Block>
			</div>
			<div className={styles['additional-info-wrapper']}>
				<Block className={styles.search}>
					<div className={styles['filter-skeleton-wrapper']}>
						<Skeleton height={44} />

						{[...Array(4)].map((_, i) => (
							<div key={i}>
								<Skeleton height={24} width="38%" style={{ marginBottom: '16px' }} />
								<div className={styles['filter-skeleton-list']}>
									{[...Array(4)].map((_, i) => (
										<Skeleton key={i} height={42} width={80} borderRadius="12px" />
									))}
								</div>
							</div>
						))}
					</div>
				</Block>
			</div>
		</section>
	);
};
