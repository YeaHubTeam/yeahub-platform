import { Block } from '@/shared/ui/Block';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './InterviewResultPage.module.css';
export const InterviewQuizResultPageSkeleton = () => {
	return (
		<div className={styles.container}>
			<Block>
				<Flex direction="column" align="center" className={styles.result}>
					<Skeleton width="calc(100% - 200px)" height={30} />
					<Flex direction="row" gap="16" align="center">
						<Skeleton
							width="clamp(150px, 10vw, 300px)"
							height="clamp(150px, 10vw, 300px)"
							borderRadius="50%"
						/>

						<Flex direction="column" gap="20" align="center">
							{[...Array(3)].map((_, i) => (
								<Skeleton key={i} height={'clamp(17px, 4vw, 35px)'} width={100} />
							))}
						</Flex>
					</Flex>
				</Flex>
			</Block>
			<Flex direction="column" gap="16">
				<Block className={styles.block}>
					<Flex direction="column" gap="16" align="center">
						<Skeleton width={'calc(100% - 200px)'} height={30} />
						<Flex>
							<Skeleton
								width="clamp(150px, 10vw, 300px)"
								height="clamp(150px, 10vw, 300px)"
								borderRadius="50%"
							/>
						</Flex>
					</Flex>
				</Block>
				<Flex justify="between" gap="12">
					{[...Array(4)].map((_, i) => (
						<Block key={i}>
							<Skeleton width="clamp(40px, 7vw, 300px)" height={17} style={{ marginBottom: 12 }} />
							<Skeleton width="clamp(40px, 7vw, 300px)" height={17} />
						</Block>
					))}
				</Flex>
			</Flex>
			<Block className={styles.passed}>
				<Flex direction="column" gap="16" align="center">
					<Skeleton width={'clamp(350px, 5vw, 600px)'} height={30} />
					<Skeleton />
				</Flex>
			</Block>
		</div>
	);
};
