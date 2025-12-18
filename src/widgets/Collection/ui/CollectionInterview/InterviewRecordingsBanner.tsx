import { useTranslation } from 'react-i18next';

import { interviewBanner } from '@/shared/assets';
import { i18Namespace, Collections } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './InterviewRecordingsBanner.module.css';

export const InterviewRecordingsBanner = () => {
	const { t } = useTranslation(i18Namespace.collection);

	return (
		<>
			<Card
				actionRoute="/avos"
				withBorder
				actionTitle={t(Collections.BANNER_INTERVIEW_LINK)}
				isActionPositionBottom
				className={styles.card}
			>
				<Flex gap="8" align="center">
					<img src={interviewBanner} alt="interviewBanner" className={styles.icon} />
					<Flex direction="column" gap="4">
						<Text variant="body4">{t(Collections.BANNER_INTERVIEW_TITLE)}</Text>
						<Text variant="body3">{t(Collections.BANNER_INTERVIEW_DESCRIPTION)}</Text>
					</Flex>
				</Flex>
			</Card>
		</>
	);
};
