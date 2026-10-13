import { UserCreateFormSkeleton } from '@/widgets/authentication/registration';

import styles from './RegistrationPage.module.css';

interface RegistrationPageSkeletonProps {
	dataTestId?: string;
}

export const RegistrationPageSkeleton = ({ dataTestId }: RegistrationPageSkeletonProps) => {
	return (
		<div data-testid={dataTestId} className={styles.wrapper}>
			<div className={styles.content}>
				<UserCreateFormSkeleton />
			</div>
		</div>
	);
};
