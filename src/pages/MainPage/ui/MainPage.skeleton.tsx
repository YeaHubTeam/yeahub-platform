import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './MainPage.module.css';

export const MainPageSkeleton = () => (
	<>
		<div className={styles.wrapper}>
			<Skeleton width={'250px'} height={'30px'} />
			<Card className={styles.card}>
				<div className={styles['card-wrapper']}>
					<div className={styles['card-content']}>
						<Skeleton width={'250px'} height={'22px'} />
						<Skeleton width={'100%'} height={'42px'} />
					</div>
					<Flex justify={'end'}>
						<Skeleton width={'240px'} height={'50px'} />
					</Flex>
				</div>
			</Card>
		</div>

		<Skeleton width={'480px'} height={'45px'} className={styles.text} />
	</>
);
