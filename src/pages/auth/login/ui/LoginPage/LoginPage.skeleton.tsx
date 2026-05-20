import { Skeleton } from '@/shared/ui/Skeleton';

import { LoginCreateFormSkeleton } from '@/widgets/authentication/login';

import styles from './LoginPage.module.css';

interface LoginPageSkeletonProps {
	dataTestId?: string;
}

export const LoginPageSkeleton = ({ dataTestId }: LoginPageSkeletonProps) => {
	return (
		<div data-testid={dataTestId} className={styles.wrapper}>
			<div className={styles['title-skeleton']}>
				<Skeleton height={36} borderRadius={6} className={styles.title} />
			</div>
			<LoginCreateFormSkeleton />
		</div>
	);
};
