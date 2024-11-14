import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { mainPage } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import { FullProfile, useProfileQuery } from '@/entities/auth';

import styles from './IncompleteProfileStub.module.css';

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

export const IncompleteProfileStub = () => {
	const navigate = useNavigate();

	const { t: tMainPage } = useI18nHelpers(i18Namespace.mainPage);

	const { data: profile } = useProfileQuery();

	const redirectToProfileEditing = () => {
		navigate(`${ROUTES.profile.edit.page}#personal-information`);
	};

	const percentFullness = useMemo(() => getPercentProfileFullness(profile), [profile]);

	const isIncompleteProfile = percentFullness < 100;

	if (!isIncompleteProfile) return null;

	return (
		<Card className={styles.card}>
			<div className={styles['card-wrapper']}>
				<div className={styles['card-content']}>
					<h3 className={styles['card-title']}>
						{tMainPage(mainPage.PROFILE_FULLNESS)} {percentFullness}%
					</h3>
					<p className={styles['card-text']}>{tMainPage(mainPage.COMPLETION_PROMPT)}</p>
				</div>
				<Button onClick={redirectToProfileEditing} className={styles.button} size="L">
					{tMainPage(mainPage.COMPLETE_PROFILE_BUTTON)}
				</Button>
			</div>
		</Card>
	);
};
