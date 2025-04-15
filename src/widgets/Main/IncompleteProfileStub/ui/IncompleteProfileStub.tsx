import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Main } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { FullProfile } from '@/entities/auth';
import { getFullProfile } from '@/entities/profile';

import styles from './IncompleteProfileStub.module.css';

const getPercentProfileFullness = (user: FullProfile | null) => {
	if (!user) return 0;

	let filledCount = 0;

	const fieldsToCheck = [
		user.avatarUrl,
		user.username,
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

	const { t } = useTranslation(i18Namespace.main);
	const fullProfile = useAppSelector(getFullProfile);

	const redirectToProfileEditing = () => {
		navigate(`${ROUTES.profile.edit.page}#personal-information`);
	};

	const percentFullness = useMemo(() => getPercentProfileFullness(fullProfile), [fullProfile]);

	const isIncompleteProfile = percentFullness < 100;

	if (!isIncompleteProfile) return null;

	return (
		<Card
			className={styles.card}
			title={t(Main.FILL_PROFILE_TITLE, { percent: percentFullness })}
			withOutsideShadow
		>
			<Flex direction="column" gap="16">
				<Text variant="body2-accent" color="black-600">
					{t(Main.FILL_PROFILE_DESCRIPTION)}
				</Text>
				<Button onClick={redirectToProfileEditing} className={styles.button} size="large">
					{t(Main.FILL_PROFILE_LINK)}
				</Button>
			</Flex>
		</Card>
	);
};
