import { useTranslation } from 'react-i18next';

import Checkmark from '@/shared/assets/icons/Checkmark.svg';
import TelegramWithBackground from '@/shared/assets/icons/telegramWithBackground.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';

import styles from './TelegramVerified.module.css';

type TelegramVerifiedProps = {
	userName: string | null | undefined;
};

export const TelegramVerified = ({ userName }: TelegramVerifiedProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<>
			<div className={styles.wrapper}>
				<Checkmark className={styles.svg} />
				<h3 className={styles['card-title']}>{t(Profile.TELEGRAM_VERIFICATION_SUCCESS_TITLE)}</h3>
			</div>
			<p className={styles['card-text']}>{t(Profile.TELEGRAM_VERIFICATION_SUCCESS_DESCRIPTION)}</p>

			<div className={styles['user-info']}>
				<TelegramWithBackground className={styles['svg-telegram']} />
				<p className={styles['card-username']}>{`@${userName}`}</p>
			</div>
		</>
	);
};
