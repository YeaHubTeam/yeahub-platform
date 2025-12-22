import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { AVOS_TELEGRAM_URL, useScreenSize } from '@/shared/libs';
import { Banner } from '@/shared/ui/Banner';

import { headphones } from '../../model/assets';

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
