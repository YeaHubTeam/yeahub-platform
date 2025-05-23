import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './CollectionPage.module.css';

export const CollectionPageSkeleton = () => {
	const { isMobile } = useScreenSize();

	if (isMobile) {
		return (
			<section className={classNames(styles.wrapper, styles.mobile)}>
				<Card>
					<div className={styles.header}>
						<Skeleton width={54} height={56} borderRadius={16} style={{ flexShrink: 0 }} />
						<div className={styles['title-wrapper']}>
							<Skeleton width="80%" height={22} />
							<Skeleton width="40%" height={22} />
						</div>
						<Skeleton width={54} height={19} borderRadius={30} style={{ marginLeft: 'auto' }} />
					</div>
				</Card>
				<Card>
					<Skeleton width={120} height={22} style={{ marginBottom: '16px' }} />
					<Skeleton width="60%" height={22} style={{ marginBottom: '10px' }} />
					<Skeleton width="100%" height={16} />
				</Card>
				<Card>
					<div className={styles.info}>
						<Skeleton width={50} height={22} />
						<div className={styles.params}>
							<Skeleton width={100} height={30} />
							<Skeleton width={150} height={30} />
						</div>
					</div>
					<div className={styles.info}>
						<Skeleton width={50} height={22} />
						<div className={styles.params}>
							<Skeleton width={100} height={42} />
							<Skeleton width={140} height={42} />
							<Skeleton width={90} height={42} />
						</div>
					</div>
					<div className={styles.info}>
						<Skeleton width={50} height={22} />
						<div className={styles.params}>
							<Skeleton width={100} height={22} />
							<Skeleton width={160} height={22} />
							<Skeleton width={110} height={22} />
						</div>
					</div>
				</Card>
				<Skeleton width={150} height={22} style={{ marginInline: 'auto' }} />
				<Card className={styles['actions-wrapper']}>
					<div className={styles.actions}>
						<Skeleton width={130} height={48} borderRadius={16} />
						<Skeleton width={130} height={48} borderRadius={16} />
						<Skeleton width={130} height={48} borderRadius={16} />
					</div>
				</Card>
				<Card>
					<Skeleton width={140} height={22} style={{ marginBottom: '20px' }} />
					<Skeleton height={200} width="100%" />
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
				<Card className={styles['actions-wrapper']}>
					<div className={styles.actions}>
						<Skeleton width={130} height={48} borderRadius={16} />
						<Skeleton width={130} height={48} borderRadius={16} />
						<Skeleton width={130} height={48} borderRadius={16} />
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
					<Skeleton width={120} height={22} style={{ marginBottom: '16px' }} />
					<Skeleton width="60%" height={22} style={{ marginBottom: '10px' }} />
					<Skeleton height={16} />
				</Card>
				<Card>
					<div className={styles.info}>
						<Skeleton width={50} height={22} />
						<div className={styles.params}>
							<Skeleton width={100} height={30} />
							<Skeleton width={150} height={30} />
						</div>
					</div>
					<div className={styles.info}>
						<Skeleton width={50} height={22} />
						<div className={styles.params}>
							<Skeleton width={100} height={42} />
							<Skeleton width={140} height={42} />
							<Skeleton width={90} height={42} />
						</div>
					</div>
					<div className={styles.info}>
						<Skeleton width={50} height={22} />
						<div className={styles.params}>
							<Skeleton width={100} height={22} />
							<Skeleton width={160} height={22} />
							<Skeleton width={110} height={22} />
						</div>
					</div>
				</Card>
				<Skeleton width={150} height={22} style={{ marginInline: 'auto' }} />
			</div>
		</section>
	);
};
