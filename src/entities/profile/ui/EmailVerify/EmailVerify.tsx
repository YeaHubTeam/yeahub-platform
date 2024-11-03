import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import ArrowRight from '@/shared/assets/icons/arrowRight.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import styles from './EmailVerify.module.css';

interface EmailVerifyProps {
	firstName: string;
}

export const EmailVerify = ({ firstName }: EmailVerifyProps) => {
	const navigate = useNavigate();

	const { t } = useI18nHelpers(i18Namespace.profile);

	const upperCaseFirstLetter =
		t(Profile.PROFILE_EMAIL_VERIFICATION_TITLE).charAt(0).toUpperCase() +
		t(Profile.PROFILE_EMAIL_VERIFICATION_TITLE).slice(1);

	const redirectToSettings = () => {
		navigate(ROUTES.settings.page);
	};

	return (
		<div className={styles.wrapper}>
			<Card className={styles.card}>
				<div className={styles['card-wrapper']}>
					<div className={styles['card-content']}>
						<h3 className={styles['card-title']}>
							{firstName}, {t(Profile.PROFILE_EMAIL_VERIFICATION_TITLE)}
						</h3>
						<p className={styles['card-text']}>
							{t(Profile.PROFILE_EMAIL_VERIFICATION_DESCRIPTION)}
						</p>
					</div>
					<Button
						onClick={redirectToSettings}
						className={styles.button}
						theme="link"
						suffix={<ArrowRight />}
					>
						{upperCaseFirstLetter}
					</Button>
				</div>
			</Card>
		</div>
	);
};
