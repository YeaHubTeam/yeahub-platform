import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector, useModal } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getRandomGurus, GurusBanner } from '@/entities/guru';
import {
	EmailVerifyStub,
	getFullProfile,
	getIsEmptySpecialization,
	getProfilesLength,
} from '@/entities/profile';

import { IncompleteProfileStub } from '@/widgets/Main/IncompleteProfileStub';
import { OnboardingModal } from '@/widgets/Main/OnboardingModal';
import { SubscribeToMedia } from '@/widgets/Main/SubscribeToMedia';

import styles from './MainPage.module.css';

const MainPage = () => {
	const profile = useAppSelector(getFullProfile);
	const profilesCount = useAppSelector(getProfilesLength);
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);

	const { t } = useTranslation([i18Namespace.translation]);
	const { isOpen, onOpen, onClose } = useModal();

	useEffect(() => {
		if (isSpecializationEmpty && profilesCount === 1) {
			onOpen();
		}
	}, []);

	const gurus = getRandomGurus();
	const showGurus = gurus.length > 0;

	return (
		<>
			{profile && (
				<Flex direction="column" gap="24" className={!profile.isVerified ? styles.wrapper : ''}>
					<Text variant="head2" className={styles.title}>
						{t(Translation.HELLO, { username: profile.username })}
					</Text>
					<Flex gap="20" className={styles['banners-container']}>
						{!profile.isVerified ? (
							<EmailVerifyStub username={profile.username} />
						) : (
							<IncompleteProfileStub />
						)}
						<Flex direction="column" gap="20" className={styles['right-banners']} maxWidth>
							<SubscribeToMedia />
							{showGurus && <GurusBanner variant="list" gurus={gurus} />}
						</Flex>
					</Flex>
				</Flex>
			)}
			<OnboardingModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default MainPage;
