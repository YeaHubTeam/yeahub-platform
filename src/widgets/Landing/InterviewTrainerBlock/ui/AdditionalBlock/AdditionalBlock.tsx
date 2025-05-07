import { Flex } from '@/shared/ui/Flex';

import questionImg2 from '@/widgets/Landing/InterviewTrainerBlock/model/assets/quiz-image2.avif';
import trainerImg from '@/widgets/Landing/InterviewTrainerBlock/model/assets/trainer-interview.avif';

import { InterviewCard } from '../InterviewCard/InterviewCard';

import styles from './AdditionalBlock.module.css';

interface AdditionalBlockProps {
	textFirst: string;
	textSecond: string;
}

export const AdditionalBlock = ({ textFirst, textSecond }: AdditionalBlockProps) => {
	return (
		<Flex direction="column" className={styles['additional-block']}>
			<InterviewCard iconType="student" img={questionImg2} text={textFirst} />
			<InterviewCard iconType="settings" img={trainerImg} text={textSecond} />
		</Flex>
	);
};
