import { i18Namespace } from '@/shared/config/i18n';
import { Translation, mainPage } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';

import { EmailVerify, getFullProfile } from '@/entities/profile';

import { IncompleteProfileStub } from '@/widgets/IncompleteProfileStub';

import styles from './MainPage.module.css';

const MainPage = () => {
	const profile = useAppSelector(getFullProfile);

	const { t } = useI18nHelpers();
	const { t: tMainPage } = useI18nHelpers(i18Namespace.mainPage);

	return (
		<>
			{profile && (
				<Flex
					direction="column"
					gap="24"
					className={!profile.isEmailVerified ? styles.wrapper : ''}
				>
					<h2 className={styles.title}>
						{t(Translation.HELLO)}, {profile.firstName}!
					</h2>
					{!profile.isEmailVerified ? (
						<EmailVerify firstName={profile.firstName} />
					) : (
						<IncompleteProfileStub />
					)}
				</Flex>
			)}
			<span className={styles.text}>{tMainPage(mainPage.UPCOMING)}</span>
		</>
	);
};

export default MainPage;
