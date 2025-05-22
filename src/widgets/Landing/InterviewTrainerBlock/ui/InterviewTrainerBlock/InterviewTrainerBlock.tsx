import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import questionImg1 from '@/widgets/Landing/InterviewTrainerBlock/model/assets/quiz-image.avif';

import { AdditionalBlock } from '../AdditionalBlock/AdditionalBlock';
import { MainBlock } from '../MainBlock/MainBlock';

import styles from './InterviewTrainerBlock.module.css';

export const InterviewTrainerBlock = () => {
	const { t } = useTranslation([i18Namespace.landing]);

	const { isTablet, isMobile } = useScreenSize();

	return (
		<section className={styles['interview-trainer']}>
			<div className={styles['title-block']}>
				<Text variant={isMobile ? 'body5-accent' : 'head3'} className={styles.title}>
					{t(Landing.TRAINING_INTERVIEW_TITLE).toUpperCase()}
				</Text>
				<Text variant="body3" className={styles.subtitle}>
					{t(Landing.TRAINING_INTERVIEW_SUBTITLE)}
				</Text>
			</div>
			<Flex
				direction={isTablet || isMobile ? 'column' : 'row'}
				className={styles['interview-trainer-wrapper']}
				align="center"
			>
				<MainBlock
					questionImg={questionImg1}
					text={t(Landing.TRAINING_INTERVIEW_SUBTITLE_TABLET)}
				/>
				<AdditionalBlock
					textFirst={t(Landing.TRAINING_INTERVIEW_ADVANTAGES_FIRST)}
					textSecond={t(Landing.TRAINING_INTERVIEW_ADVANTAGES_SECOND)}
				/>
			</Flex>
		</section>
	);
};
