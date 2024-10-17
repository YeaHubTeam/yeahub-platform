import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './InterviewPage.module.css';

export const InterviewPageSkeleton = () => {
	return (
		<div className={styles.container}>
			<Card className={styles.interview}>
				<div className={styles['skeleton-interview-header']}>
					<Flex gap="4" justify={'between'}>
						<Skeleton width={300} height={22} borderRadius={20} />
						<Skeleton width={300} height={22} borderRadius={20} />
					</Flex>
				</div>
				<Card className={styles['skeleton-card-main']}>
					<Flex direction="column" gap="8">
						<Skeleton height={5} borderRadius={20} />
						<Skeleton height={20} width={'30%'} borderRadius={20} />
						<Skeleton height={30} borderRadius={20} />
						<Skeleton height={340} borderRadius={20} />
					</Flex>
				</Card>
			</Card>
			<Card className={styles.statistics}>
				<Flex direction="column" gap="20">
					<Skeleton width={200} height={22} borderRadius={20} />
					<Skeleton style={{ margin: '0 auto' }} height={241} width={241} borderRadius={'50%'} />
					<Flex gap="12">
						{[...Array(3)].map((_, index) => (
							<Skeleton key={index} height={75} borderRadius={20} />
						))}
					</Flex>
					<Flex justify="end">
						<Skeleton width={200} height={22} borderRadius={20} />
					</Flex>
				</Flex>
			</Card>
			<Card className={styles['skeleton-card-questions']}>
				<Flex gap="4" justify={'between'} style={{ marginBottom: '40px' }}>
					<Skeleton width={150} height={22} borderRadius={20} />
					<Skeleton width={150} height={22} borderRadius={20} />
				</Flex>
				{[...Array(3)].map((_, index) => (
					<Flex key={index} gap="4" style={{ width: '100%', marginBottom: '20px' }}>
						<Skeleton height={50} width={70} />
						<Flex direction="column" style={{ width: '100%' }}>
							<Skeleton height={30} width={'90%'} style={{ marginBottom: '5px' }} />
							<Flex gap="8">
								<Skeleton height={35} width={75} />
								<Skeleton height={35} width={75} />
							</Flex>
						</Flex>
					</Flex>
				))}
			</Card>
			<Card className={styles['skeleton-card-history']}>
				<Flex gap="4" justify={'between'} style={{ marginBottom: '40px' }}>
					<Skeleton width={150} height={22} borderRadius={20} />
					<Skeleton width={150} height={22} borderRadius={20} />
				</Flex>
				{[...Array(3)].map((_, index) => (
					<Flex
						direction="column"
						key={index}
						gap="4"
						style={{ width: '100%', marginBottom: '20px' }}
					>
						<Skeleton width={150} height={22} borderRadius={20} />
						<Flex gap="4" justify={'between'}>
							<Skeleton width={200} height={22} borderRadius={20} />
							<Skeleton width={200} height={22} borderRadius={20} />
						</Flex>
					</Flex>
				))}
			</Card>
		</div>
	);
};
