import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useCurrentProject, useScreenSize } from '@/shared/hooks';
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
	const project = useCurrentProject();
	const isLanding = project === 'landing';
	const questionRoute = isLanding
		? route(ROUTES.questions.detail.page, id)
		: route(ROUTES.interview.questions.detail.page, id);

	return (
		<li className={styles.item}>
			<Link to={questionRoute} className={styles.link}>
				{!isMobileS && <ImageWithWrapper src={imageSrc} className={styles.image} />}
				<Flex direction="column" gap="8">
					<Text variant="body3-accent" maxRows={1} className={styles.title}>
						{title}
					</Text>
					<QuestionGradeList
						rate={rate}
						complexity={complexity}
						className={styles.params}
						itemClassName={styles['params-item']}
						size={'small'}
					/>
				</Flex>
			</Link>
		</li>
	);
};
