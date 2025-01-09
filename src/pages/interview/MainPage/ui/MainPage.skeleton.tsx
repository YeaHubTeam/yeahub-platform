import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { EmailVerifyStubSkeleton, getFullProfile } from '@/entities/profile';

import { IncompleteProfileStubSkeleton } from '@/widgets/Main/IncompleteProfileStub';

import styles from './MainPage.module.css';

export const MainPageSkeleton = () => {
	const profile = useAppSelector(getFullProfile);

	return (
		<Flex direction="column" gap="24" className={!profile?.isEmailVerified ? styles.wrapper : ''}>
			<TextSkeleton variant="head2" width={200} className={styles.title} />
			{!profile?.isEmailVerified ? <EmailVerifyStubSkeleton /> : <IncompleteProfileStubSkeleton />}
		</Flex>
	);
};
