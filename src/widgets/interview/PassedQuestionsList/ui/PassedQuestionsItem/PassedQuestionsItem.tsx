import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Chip } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useCurrentProject } from '@/shared/hooks';
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

	const { imageSrc, answer, questionTitle, questionId } = question;

	const questionAnswers: Record<QuizQuestionAnswerType, QuestionAnswerItem> = {
		UNKNOWN: {
			label: InterviewQuiz.ANSWER_DO_NOT_KNOW,
			icon: 'dislike',
		},
		KNOWN: {
			label: InterviewQuiz.ANSWER_KNOW,
			icon: 'like',
		},
	};

	const questionLink =
		project === 'landing'
			? route(ROUTES.questions.detail.page, questionId)
			: route(ROUTES.interview.questions.detail.page, questionId);

	return (
		<Link to={questionLink} className={styles.link}>
			<li className={styles.item}>
				<ImageWithWrapper src={imageSrc} className={styles.img} />
				<Flex direction="column" gap="8" maxWidth>
					<Text variant="body4" maxRows={2} color="black-800">
						{questionTitle}
					</Text>
					<Chip
						theme="outlined"
						preffix={<Icon icon={questionAnswers[answer].icon} size={24} />}
						label={t(questionAnswers[answer].label)}
					/>
				</Flex>
			</li>
		</Link>
	);
};
