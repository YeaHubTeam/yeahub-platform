import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Chip, Icon } from 'yeahub-ui-kit';
import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { Answers, QuizQuestionAnswerType } from '@/entities/quiz';

import styles from './PassedQuestionsItem.module.css';

interface Props {
	question: Answers;
}

interface MappingItem {
	label: string;
	icon: IconsName;
}

export const PassedQuestionsItem = ({ question }: Props) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const { imageSrc, answer, questionTitle, questionId } = question;

	const mapping: Record<QuizQuestionAnswerType, MappingItem> = {
		UNKNOWN: {
			label: InterviewQuiz.ANSWER_DO_NOT_KNOW,
			icon: 'thumbsDown',
		},
		KNOWN: {
			label: InterviewQuiz.ANSWER_KNOW,
			icon: 'thumbsUp',
		},
	};

	return (
		<Link to={route(ROUTES.interview.questions.detail.page, questionId)} className={styles.link}>
			<li>
				<article className={styles.item}>
					<ImageWithWrapper src={imageSrc} className={styles.img} />
					<div className={styles.info}>
						<h4 className={styles.title}>{questionTitle}</h4>
						<Chip
							theme="outlined"
							preffix={<Icon key={mapping[answer].icon} icon={mapping[answer].icon} size={24} />}
							label={t(mapping[answer].label)}
						/>
					</div>
				</article>
			</li>
		</Link>
	);
};
