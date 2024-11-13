import { useMemo } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, mainPage } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';

import { FullProfile, useProfileQuery } from '@/entities/auth';
import { EmailVerify } from '@/entities/profile';

import { IncompleteProfileStub } from '@/widgets/IncompleteProfileStub';

import styles from './MainPage.module.css';

const getPercentProfileFullness = (user: FullProfile | undefined) => {
	if (!user) return 0;

	let filledCount = 0;

	const fieldsToCheck = [
		user.avatarUrl,
		user.firstName,
		user.lastName,
		user.phone,
		user.email,
		user.city,
		user.profiles[0].description,
		user.profiles[0].specializationId !== 0 ? user.profiles[0].specializationId.toString() : null,
		user.profiles[0].profileSkills.length > 0 ? user.profiles[0].profileSkills : null,
	];

	filledCount += fieldsToCheck.filter((field) => field && field.length > 0).length;

	const socialLength = user.profiles[0].socialNetwork?.length || 0;
	filledCount += socialLength > 2 ? 2 : socialLength;

	const allFileldsCount = fieldsToCheck.length + 2;

	return Math.round((filledCount / allFileldsCount) * 100);
};

const MainPage = () => {
	const { data: profile } = useProfileQuery();

	const { t } = useI18nHelpers();
	const { t: tMainPage } = useI18nHelpers(i18Namespace.mainPage);

	const percentFullness = useMemo(() => getPercentProfileFullness(profile), [profile]);

	const isIncompleteProfile = percentFullness < 100;

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
						isIncompleteProfile && <IncompleteProfileStub percent={percentFullness} />
					)}
				</Flex>
			)}
			<span className={styles.text}>{tMainPage(mainPage.UPCOMING)}</span>
		</>
	);
};

export default MainPage;
