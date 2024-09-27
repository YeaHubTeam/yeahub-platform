import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './MainPage.module.css';

const MainPageSkeleton = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<Skeleton width={'250px'} height={30} />
				<Card className={styles.block}>
					<div className={styles['block-wrapper']}>
						<div className={styles['block-content']}>
							<Skeleton width={'250px'} height={22} />
							<Skeleton width={'100%'} height={42} />
						</div>
						<Flex justify={'end'}>
							<Skeleton width={240} height={50} />
						</Flex>
					</div>
				</Card>
			</div>

			<Skeleton width={480} height={45} className={styles.text} />
		</>
	);
};

export default MainPageSkeleton;
