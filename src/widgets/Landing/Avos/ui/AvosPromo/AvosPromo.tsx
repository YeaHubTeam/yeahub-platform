import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { AVOS_TELEGRAM_URL, useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { desktopScreenshot, tabletScreenshot } from '../../model/assets';

import styles from './AvosPromo.module.css';

export const AvosPromo = () => {
	const { isMobileS } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);
	const chips = [
		t(Landing.AVOS_PROMO_CHIPS_REVIEWS),
		t(Landing.AVOS_PROMO_CHIPS_RECORDINGS),
		t(Landing.AVOS_PROMO_CHIPS_BREAKDOWNS),
		t(Landing.AVOS_PROMO_CHIPS_INTERVIEW),
		t(Landing.AVOS_PROMO_CHIPS_GUIDES),
	];
	const openTelegram = () => window.open(AVOS_TELEGRAM_URL, '_blank');

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex justify="between" gap="20">
				<div>
					<Text variant="body5">{t(Landing.AVOS_PROMO_ABOUT)}</Text>
					<Text variant="body3" className={styles.subtitle}>
						{t(Landing.AVOS_PROMO_LEARN)}
					</Text>

					<img
						src={tabletScreenshot}
						alt="telegram channel's screenshots"
						className={styles['tablet-screenshot']}
						loading="lazy"
					/>

					<Flex wrap="wrap" gap={isMobileS ? '8' : '12'} className={styles.chips}>
						{chips.map((chip, i) => (
							<Chip
								key={i}
								label={chip}
								labelVariant={isMobileS ? 'body2-accent' : 'body3-accent'}
								active
							/>
						))}
					</Flex>

					<Text variant="body3" className={styles.sum}>
						{t(Landing.AVOS_PROMO_SUM)}
					</Text>
					<Text variant="body3" color="black-500" className={styles.sum}>
						{t(Landing.AVOS_PROMO_WARN)}
					</Text>
					<Button size="large" className={styles.button} onClick={openTelegram}>
						{t(Landing.AVOS_PROMO_JOIN_PRICE)}
					</Button>
				</div>

				<img
					src={desktopScreenshot}
					alt="telegram channel's screenshots"
					className={styles.screenshot}
					loading="lazy"
				/>
			</Flex>
		</Card>
	);
};
