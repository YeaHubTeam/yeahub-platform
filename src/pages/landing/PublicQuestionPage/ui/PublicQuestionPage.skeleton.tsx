import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './PublicQuestionPage.module.css';

export const PublicQuestionPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	if (isMobile) {
		return (
			<section className={classNames(styles.wrapper, styles.mobile)}>
				<Flex gap="20" justify="between" className={styles['back-header']}>
					<Skeleton height={40} width={40} borderRadius={'50%'} />
					<Skeleton height={40} width={40} borderRadius={'8px'} />{' '}
				</Flex>
				<Card>
					<div className={styles.header}>
						<div className={styles['title-wrapper']}>
							<Skeleton width="100%" height={22} />
							<Skeleton width="40%" height={22} />
						</div>
					</div>
				</Card>
				<Card>
					<Skeleton width={140} height={22} style={{ marginBottom: '20px' }} />
					<Skeleton height={200} />
				</Card>
				<Card>
					<Skeleton width={140} height={22} style={{ marginBottom: '20px' }} />
					<Skeleton height={200} />
				</Card>
			</section>
		);
	}

	if (isTablet) {
		return (
			<section className={classNames(styles.wrapper, styles.tablet)}>
				<Flex gap="20" justify="between" className={styles['back-header']}>
					<Skeleton height={40} width={40} borderRadius={'50%'} />
					<Skeleton height={40} width={40} borderRadius={'8px'} />
				</Flex>
				<Card>
					<div className={styles.header}>
						<div className={styles['title-wrapper']}>
							<Skeleton width="100%" height={22} />
							<Skeleton width="40%" height={22} />
						</div>
					</div>
				</Card>
				<Card>
					<Skeleton width={140} height={22} style={{ marginBottom: '20px' }} />
					<Skeleton height={200} />
				</Card>
				<Card>
					<Skeleton width={140} height={22} style={{ marginBottom: '20px' }} />
					<Skeleton height={200} />
				</Card>
			</section>
		);
	}

	return (
		<section className={styles.wrapper}>
			<Flex gap="20" justify="between" className={styles['back-button-wrapper']}>
				<Skeleton height={40} width={40} borderRadius={'50%'} />
			</Flex>
			<div className={styles.content}>
				<div className={styles.main}>
					<Card>
						<div className={styles.header}>
							<Skeleton width={170} height={114} borderRadius={24} style={{ flexShrink: 0 }} />
							<div className={styles['title-wrapper']}>
								<Skeleton width="80%" height={44} />
								<Skeleton width="50%" height={22} />
							</div>
							<Skeleton style={{ marginLeft: 'auto' }} width={78} height={19} borderRadius={30} />
						</div>
					</Card>
					<Card>
						<Skeleton width={140} height={22} style={{ marginBottom: '20px' }} />
						<Skeleton height={200} />
					</Card>
					<Card>
						<Skeleton width={170} height={22} style={{ marginBottom: '20px' }} />
						<Skeleton height={350} />
					</Card>
				</div>
				<div className={styles.additional}>
					<Card>
						<Flex direction="column" gap="24">
							<Flex className={styles['skeleton-level']} direction="column" gap="16">
								<Skeleton width={70} height={22} />
								<Flex gap="16">
									<Skeleton width={140} height={33} />
									<Skeleton width={116} height={33} />
								</Flex>
							</Flex>
							<Flex direction="column" gap="16">
								<Skeleton width={50} height={22} />
								<div className={styles.params}>
									<Skeleton width={100} height={30} />
									<Skeleton width={150} height={30} />
								</div>
							</Flex>
							<Flex direction="column" gap="16">
								<Skeleton width={50} height={22} />
								<div className={styles.params}>
									<Skeleton width={100} height={22} />
									<Skeleton width={160} height={22} />
									<Skeleton width={110} height={22} />
								</div>
							</Flex>
						</Flex>
					</Card>
					<Skeleton width={150} height={22} style={{ marginInline: 'auto' }} />
				</div>
			</div>
		</section>
	);
};
