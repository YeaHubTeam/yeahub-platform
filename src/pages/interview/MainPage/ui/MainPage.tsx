import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, mainPage } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { FullProfile, useProfileQuery } from '@/entities/auth';
import { EmailVerify } from '@/entities/profile';

import styles from './MainPage.module.css';

const getPercentProfileFullness = (user: FullProfile) => {
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
	const [percentProfileFullness, setPercentProfileFullness] = useState<number>(0);

	const { data: profile } = useProfileQuery();

	const navigate = useNavigate();
	const { t } = useI18nHelpers();
	const { t: tMainPage } = useI18nHelpers(i18Namespace.mainPage);

	const redirectToProfileEditing = () => {
		navigate(`${ROUTES.profile.edit.page}#personal-information`);
	};

	useEffect(() => {
		if (profile) {
			const percentFullness = getPercentProfileFullness(profile);
			setPercentProfileFullness(percentFullness);
		}
	}, [profile]);

	const isIncompleteProfile = percentProfileFullness < 100;

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
						isIncompleteProfile && (
							<Card className={styles.card}>
								<div className={styles['card-wrapper']}>
									<div className={styles['card-content']}>
										<h3 className={styles['card-title']}>
											{tMainPage(mainPage.PROFILE_FULLNESS)} {percentProfileFullness}%
										</h3>
										<p className={styles['card-text']}>{tMainPage(mainPage.COMPLETION_PROMPT)}</p>
									</div>
									<Button onClick={redirectToProfileEditing} className={styles.button} size="L">
										{tMainPage(mainPage.COMPLETE_PROFILE_BUTTON)}
									</Button>
								</div>
							</Card>
						)
					)}
				</Flex>
			)}
			<span className={styles.text}>{tMainPage(mainPage.UPCOMING)}</span>
		</>
	);
};

export default MainPage;
