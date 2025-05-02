import { useTranslation } from 'react-i18next';

import quizImg from '@/shared/assets/images/landing/quiz-image.avif';
import quizImg2 from '@/shared/assets/images/landing/quiz-image2.avif';
import trainerImg from '@/shared/assets/images/landing/trainer-interview.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { InterviewCard } from '../InterviewCard/InterviewCard';

import styles from './InterviewTrainerBlock.module.css';

export const InterviewTrainerBlock = () => {
	const { t } = useTranslation([i18Namespace.landing]);

	const { isTablet, isMobile } = useScreenSize();

	return (
		<>
			<section className={styles['interview-trainer']}>
				<Flex
					direction={isTablet || isMobile ? 'column' : 'row'}
					className={styles['interview-trainer-wrapper']}
					align="center"
				>
					<div className={styles['title-block']}>
						<Text variant="head2" className={styles.title}>
							{t(Landing.TRAINING_INTERVIEW_TITLE).toUpperCase()}
						</Text>
						<Text variant="body3" className={styles.subtitle}>
							{t(Landing.TRAINING_INTERVIEW_SUBTITLE)}
						</Text>
					</div>
					<Flex gap="20" direction="column" className={styles['left-block']}>
						<div className={styles['image-wrapper']}>
							<img className={styles['image']} src={quizImg} alt="quiz example" />
						</div>
						<p>{t(Landing.TRAINING_INTERVIEW_SUBTITLE_TABLET)}</p>
					</Flex>
					<Flex direction="column" className={styles['right-block']}>
						<InterviewCard
							iconType="student"
							img={quizImg2}
							text={t(Landing.TRAINING_INTERVIEW_ADVANTAGES_FIRST)}
						/>
						<InterviewCard
							iconType="settings"
							img={trainerImg}
							text={t(Landing.TRAINING_INTERVIEW_ADVANTAGES_SECOND)}
						/>
					</Flex>
				</Flex>
			</section>
		</>
	);
};
