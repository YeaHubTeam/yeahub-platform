import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Main, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { EmailVerifyStub, getFullProfile } from '@/entities/profile';

import { IncompleteProfileStub } from '@/widgets/IncompleteProfileStub';

import styles from './MainPage.module.css';

const MainPage = () => {
	const profile = useAppSelector(getFullProfile);

	const { t } = useTranslation([i18Namespace.translation, i18Namespace.main]);

	return (
		<>
			{profile && (
				<Flex
					direction="column"
					gap="24"
					className={!profile.isEmailVerified ? styles.wrapper : ''}
				>
					<Text variant="head2" className={styles.title}>
						{t(Translation.HELLO, { name: profile.firstName })}
					</Text>
					{!profile.isEmailVerified ? (
						<EmailVerifyStub firstName={profile.firstName} />
					) : (
						<IncompleteProfileStub />
					)}
				</Flex>
			)}
			<Text variant="body3-accent" color="black-300" className={styles.text}>
				{t(Main.PLACEHOLDER, { ns: i18Namespace.main })}
			</Text>
		</>
	);
};

export default MainPage;
