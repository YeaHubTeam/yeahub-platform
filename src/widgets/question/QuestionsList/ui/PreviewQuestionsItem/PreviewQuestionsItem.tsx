import { Link } from 'react-router-dom';

import { useCurrentProject, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import {
	Question,
	QuestionGradeList,
	getQuestionRoute,
	getQuestionImage,
} from '@/entities/question';

import styles from './PreviewQuestionsItem.module.css';

interface PreviewQuestionsItemProps {
	question: Question;
}

export const PreviewQuestionsItem = ({ question }: PreviewQuestionsItemProps) => {
	const { id, title, rate, complexity = 0 } = question;
	const { isMobileS } = useScreenSize();
	const project = useCurrentProject();
	const questionRoute = getQuestionRoute[project](id);
	const imagePriorityToShow = getQuestionImage(question);

	return (
		<li>
			<Card withOutsideShadow size="small">
				<Link to={questionRoute} className={styles.link}>
					{!isMobileS && <ImageWithWrapper src={imagePriorityToShow} className={styles.image} />}
					<Flex direction="column" gap="8">
						<Text variant="body3-accent" maxRows={1} className={styles.title}>
							{title}
						</Text>
						<QuestionGradeList
							rate={rate}
							complexity={complexity}
							className={styles.params}
							size="small"
						/>
					</Flex>
				</Link>
			</Card>
		</li>
	);
};
