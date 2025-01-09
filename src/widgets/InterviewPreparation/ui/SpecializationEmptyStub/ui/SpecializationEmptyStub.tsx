import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Main, Specializations } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './SpecializationEmptyStub.module.css';

export const SpecializationEmptyStub = () => {
	const { t } = useTranslation([i18Namespace.specialization, i18Namespace.main]);
	const navigate = useNavigate();

	const onProfileRedirect = () => {
		navigate(ROUTES.profile.edit.page);
	};

	return (
		<Flex direction="column" gap="8" className={styles.card}>
			<Text variant="body5-strong">{t(Specializations.STUB_EMPTY_TITLE)}</Text>
			<Text variant="body2-accent" color="black-600" className={styles['card-text']}>
				{t(Specializations.STUB_EMPTY_DESCRIPTION)}
			</Text>
			<Button onClick={onProfileRedirect} className={styles.button} size="L">
				{t(Main.FILL_PROFILE_LINK, { ns: i18Namespace.main })}
			</Button>
		</Flex>
	);
};
