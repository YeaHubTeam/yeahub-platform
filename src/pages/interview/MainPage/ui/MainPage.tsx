import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, mainPage } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import { GetProfileResponse, useProfileQuery } from '@/entities/auth';
import { EmailVerify } from '@/entities/profile';

import styles from './MainPage.module.css';

const MainPage = () => {
	const [percentProfileFullness, setPercentProfileFullness] = useState<number>(0);

	const { data: profile } = useProfileQuery();

	const navigate = useNavigate();
	const { t } = useI18nHelpers();
	const { t: tMainPage } = useI18nHelpers(i18Namespace.mainPage);

	const getPercentProfileFullness = useCallback((profile: GetProfileResponse) => {
		const allFileldsCount = Object.keys(profile).length - 1;
		const fullnessCount =
			Object.values(profile).filter((item) => item && item.length > 0).length - 1;

		const percentFullness = Math.round((fullnessCount / allFileldsCount) * 100);
		return percentFullness;
	}, []);

	const redirectToProfileEditing = () => {
		navigate(`${ROUTES.profile.edit.page}#personal-information`);
	};

	useEffect(() => {
		if (profile) {
			const percentFullness = getPercentProfileFullness(profile);
			setPercentProfileFullness(percentFullness);
		}
	}, [getPercentProfileFullness, profile]);

	const isIncompleteProfile = percentProfileFullness < 100;

	return (
		<>
			{profile && (
				<div className={styles.wrapper}>
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
									<Button onClick={redirectToProfileEditing} className={styles.button} size="large">
										{tMainPage(mainPage.COMPLETE_PROFILE_BUTTON)}
									</Button>
								</div>
							</Card>
						)
					)}
				</div>
			)}
			<span className={styles.text}>{tMainPage(mainPage.UPCOMING)}</span>
		</>
	);
};

export default MainPage;
