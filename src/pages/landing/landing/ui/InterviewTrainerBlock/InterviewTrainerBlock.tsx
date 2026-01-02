import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { quizImage } from '../../model/assets';
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
				<MainBlock questionImg={quizImage} text={t(Landing.TRAINING_INTERVIEW_SUBTITLE_TABLET)} />
				<AdditionalBlock
					textFirst={t(Landing.TRAINING_INTERVIEW_ADVANTAGES_FIRST)}
					textSecond={t(Landing.TRAINING_INTERVIEW_ADVANTAGES_SECOND)}
				/>
			</Flex>
		</section>
	);
};
