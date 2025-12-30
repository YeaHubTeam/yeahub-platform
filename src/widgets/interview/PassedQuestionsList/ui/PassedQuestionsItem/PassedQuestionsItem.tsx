import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, InterviewQuiz, ROUTES } from '@/shared/config';
import { route, useCurrentProject, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Icon, IconName } from '@/shared/ui/Icon';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Answers, QuizQuestionAnswerType } from '@/entities/quiz';

import styles from './PassedQuestionsItem.module.css';

interface PassedQuestionsItemProps {
	question: Answers;
}

interface QuestionAnswerItem {
	label: string;
	icon: IconName;
}

export const PassedQuestionsItem = ({ question }: PassedQuestionsItemProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	const project = useCurrentProject();
	const { isMobile } = useScreenSize();

	const { imageSrc, answer, questionTitle, questionId } = question;

	const questionAnswers: Record<QuizQuestionAnswerType, QuestionAnswerItem> = {
		UNKNOWN: {
			label: InterviewQuiz.ANSWER_DO_NOT_KNOW,
			icon: 'thumbsDown',
		},
		KNOWN: {
			label: InterviewQuiz.ANSWER_KNOW,
			icon: 'thumbsUp',
		},
	};

	const questionLink =
		project === 'landing'
			? route(ROUTES.questions.detail.page, questionId)
			: route(ROUTES.wiki.questions.detail.page, questionId);

	const iconColor = answer === 'KNOWN' ? 'purple-700' : 'black-700';
	const answerStyles = answer === 'KNOWN' ? styles['answer-known'] : styles['answer-unknown'];

	return (
		<Card withOutsideShadow size="small">
			<Link to={questionLink} className={styles.link}>
				<li className={styles.item}>
					<ImageWithWrapper src={imageSrc} className={styles.img} />
					<Flex direction="column" gap="8" maxWidth>
						<Text variant={isMobile ? 'body3-accent' : 'body4'} maxRows={2} color="black-800">
							{questionTitle}
						</Text>
						<Chip
							theme="primary"
							prefix={<Icon icon={questionAnswers[answer].icon} size={24} color={iconColor} />}
							label={t(questionAnswers[answer].label)}
							style={{ background: '#F8F8F8' }}
							className={`${styles.answer} ${answerStyles}`}
						/>
					</Flex>
				</li>
			</Link>
		</Card>
	);
};
