import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { ArticlesListSkeleton } from '@/widgets/Article';

import styles from './ArticlesPage.module.css';

export const ArticlesPageSkeleton = () => {
	return (
		<Flex gap="20" align="start" className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Card className={styles.content}>
					<Flex justify="between" className={styles.header}>
						<TextSkeleton variant="body6" width={124} />
					</Flex>
					<ArticlesListSkeleton />
				</Card>
			</div>
		</Flex>
	);
};
