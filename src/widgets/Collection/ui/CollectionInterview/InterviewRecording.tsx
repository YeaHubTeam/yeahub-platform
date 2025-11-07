import { useTranslation } from 'react-i18next';

import ozonIcon from '@/shared/assets/images/ozonIcon.jpg';
import sberIcon from '@/shared/assets/images/sberIcon.jpg';
import tBankIcon from '@/shared/assets/images/tBankIcon.jpg';
import vkIcon from '@/shared/assets/images/vkIcon.jpg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './InterviewRecording.module.css';

export const InterviewRecording = () => {
	const { t } = useTranslation(i18Namespace.collection);
	return (
		<>
			<Card
				actionRoute={'/avos'}
				withBorder
				actionTitle={t(Collections.INTERVIEW_JOIN)}
				isActionPositionBottom
				className={styles.card}
			>
				<Flex gap={'8'}>
					<Flex className={styles.wrapperIcon}>
						<img src={sberIcon} alt={'sberIcon'} className={styles.icon} />
						<img src={ozonIcon} alt={'ozonIcon'} className={styles.icon} />
						<img src={tBankIcon} alt={'tBankIcon'} className={styles.icon} />
						<img src={vkIcon} alt={'vkIcon'} className={styles.icon} />
					</Flex>
					<Flex direction="column" gap="4">
						<Text variant={'body4'}>{t(Collections.INTERVIEW_RECORDINGS)}</Text>
						<Text variant={'body3'}>{t(Collections.INTERVIEW_ALL_RECORDINGS)}</Text>
					</Flex>
				</Flex>
			</Card>
		</>
	);
};
