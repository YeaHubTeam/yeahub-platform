import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { InputSkeleton } from '@/shared/ui/Input';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './LoginPage.module.css';
import skeletonStyles from './LoginPage.skeleton.module.css';

interface LoginPageSkeletonProps {
	dataTestId?: string;
}

export const LoginPageSkeleton = ({ dataTestId }: LoginPageSkeletonProps) => {
	return (
		<div data-testid={dataTestId} className={styles.wrapper}>
			<Skeleton height={36} borderRadius={6} className={skeletonStyles.title} />

			<Flex direction="column" justify="between" className={skeletonStyles['form-wrapper']}>
				<Flex direction="column" className={skeletonStyles.form} gap="8">
					<Flex direction="column" gap="8" className={skeletonStyles['email-field']}>
						<Skeleton width={140} height={18} borderRadius={4} />
						<InputSkeleton size="L" className={skeletonStyles.input} />
					</Flex>

					<Flex direction="column" className={skeletonStyles['password-field']}>
						<Flex direction="column" gap="8">
							<Skeleton width={60} height={18} borderRadius={4} />
							<InputSkeleton size="L" className={skeletonStyles.input} />
						</Flex>
						<Flex justify="end" className={skeletonStyles['forgot-password']}>
							<Skeleton width={110} height={16} borderRadius={4} />
						</Flex>
					</Flex>

					<ButtonSkeleton
						variant="primary"
						size="medium"
						className={skeletonStyles['submit-button']}
					/>

					<Flex direction="column" align="center" gap="8">
						<Skeleton width={300} height={18} borderRadius={4} />
						<Skeleton width={238} height={40} borderRadius={4} />
					</Flex>
				</Flex>

				<Flex justify="center">
					<Skeleton height={52} borderRadius={8} className={skeletonStyles.registration} />
				</Flex>
			</Flex>
		</div>
	);
};
