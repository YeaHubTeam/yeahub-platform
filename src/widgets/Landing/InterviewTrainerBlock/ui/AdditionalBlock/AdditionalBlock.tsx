import { Flex } from '@/shared/ui/Flex';

import { trainerInterview, quizImage2 } from '../../model/assets';
import { InterviewCard } from '../InterviewCard/InterviewCard';

import styles from './AdditionalBlock.module.css';

interface AdditionalBlockProps {
	textFirst: string;
	textSecond: string;
}

export const AdditionalBlock = ({ textFirst, textSecond }: AdditionalBlockProps) => {
	return (
		<Flex direction="column" className={styles['additional-block']}>
			<InterviewCard iconType="student" img={quizImage2} text={textFirst} />
			<InterviewCard iconType="settings" img={trainerInterview} text={textSecond} />
		</Flex>
	);
};
