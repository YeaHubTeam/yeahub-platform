import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './UserProfilePage.module.css';

export const UserProfilePageSkeleton = () => {
	return (
		<div className={styles.content}>
			<div className={styles.container}>
				<Card className={styles['profile-card-skeleton']}>
					<div className={styles['flex-profile-skeleton']}>
						<Flex gap="8" direction="column">
							<Skeleton width={170} height={188} borderRadius={20} />
							<Flex direction="column" gap="4">
								<Skeleton width={170} height={18} />
								<Skeleton width={170} height={18} />
							</Flex>
						</Flex>
						<Flex direction="column" gap="12">
							<Flex align="center" gap="8">
								<Skeleton width={271} height={27} />
								<Skeleton
									width={73}
									height={20}
									borderRadius={20}
									style={{ alignSelf: 'self-start' }}
								/>
							</Flex>
							<Flex direction="column" gap="8" style={{ marginBottom: '30px' }}>
								{[...Array(4)].map((_, index) => (
									<span key={index}>
										<Skeleton width={190} height={14} />
									</span>
								))}
							</Flex>
							<Flex direction="column" gap="8">
								{[...Array(2)].map((_, index) => (
									<span key={index}>
										<Skeleton width={190} height={14} />
									</span>
								))}
							</Flex>
							<Flex gap="4">
								{[...Array(6)].map((_, index) => (
									<span key={index}>
										<Skeleton height={24} width={24} borderRadius={50} />
									</span>
								))}
							</Flex>
						</Flex>
						<div style={{ flex: '1 0' }} className={styles['sleleton-link-profile']}>
							<div className={styles['sleleton-link']}>
								<Skeleton width="100%" height="100%" />
							</div>
						</div>
					</div>
				</Card>
				<Card className={styles['card-skeleton']}>
					<div className={styles['header-card-skeleton']}>
						<Flex gap="16" justify="between">
							<Skeleton width={81} height={27} />
							<div style={{ flex: '1 0' }}>
								<div className={styles['sleleton-link']}>
									<Skeleton width="100%" height="100%" />
								</div>
							</div>
						</Flex>
					</div>
					<Flex direction="column" gap="8" style={{ width: '100%' }}>
						{[...Array(6)].map((_, index) => (
							<Skeleton width="100%" height={14} key={index} />
						))}
					</Flex>
				</Card>
				<Card className={styles['card-skeleton']}>
					<div className={styles['header-card-skeleton']}>
						<Flex gap="16" justify="between">
							<Skeleton width={81} height={27} />
							<div style={{ flex: '1 0' }}>
								<div className={styles['sleleton-link']}>
									<Skeleton width="100%" height="100%" />
								</div>
							</div>
						</Flex>
					</div>
					<Flex gap="8" style={{ flexWrap: 'wrap' }}>
						{[...Array(8)].map((_, index) => (
							<span key={index}>
								<Skeleton width={index % 2 === 0 ? 110 : 140} height={42} />
							</span>
						))}
					</Flex>
				</Card>
			</div>
		</div>
	);
};
