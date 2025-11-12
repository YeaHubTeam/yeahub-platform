import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { AVOS_TELEGRAM_URL } from '@/shared/constants/media';
import { useScreenSize } from '@/shared/hooks';
import { Banner } from '@/shared/ui/Banner';

import headphones from '@/widgets/Landing/Avos/model/assets/headphones.jpg';

import styles from './AvosListen.module.css';

export const AvosListen = () => {
	const { isMobileS } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);
	const openTelegram = () => window.open(AVOS_TELEGRAM_URL, '_blank');

	return (
		<Banner
			img={headphones}
			title={t(Landing.AVOS_LISTEN_PRACTICE)}
			titleVariant={isMobileS ? 'body3-accent' : 'body5-accent'}
			buttonLabel={t(Landing.AVOS_LISTEN_JOIN)}
			className={styles['listen-wrap']}
			buttonClassName={styles.button}
			onButtonClick={openTelegram}
			innerWrapClassName={styles['inner-wrap']}
		/>
	);
};
