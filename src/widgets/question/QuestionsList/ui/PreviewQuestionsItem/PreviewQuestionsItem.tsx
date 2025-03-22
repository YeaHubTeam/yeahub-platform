import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Question, QuestionGradeList } from '@/entities/question';

import styles from './PreviewQuestionsItem.module.css';

interface PreviewQuestionsItemProps {
	question: Question;
}

export const PreviewQuestionsItem = ({ question }: PreviewQuestionsItemProps) => {
	const { id, imageSrc, title, rate, complexity = 0 } = question;
	const { isMobileS } = useScreenSize();

	return (
		<li className={styles.item}>
			<Link to={route(ROUTES.interview.questions.detail.page, id)} className={styles.link}>
				{!isMobileS && <ImageWithWrapper src={imageSrc} className={styles.image} />}
				<Flex direction="column" gap="8">
					<Text variant="body3-accent" maxRows={1} className={styles.title}>
						{title}
					</Text>
					<QuestionGradeList rate={rate} complexity={complexity} className={styles.params} />
				</Flex>
			</Link>
		</li>
	);
};
