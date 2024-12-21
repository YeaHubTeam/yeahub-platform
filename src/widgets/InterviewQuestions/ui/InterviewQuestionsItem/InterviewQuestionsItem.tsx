import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import { Question } from '@/entities/question';

import styles from './InterviewQuestionsItem.module.css';

interface InterviewQuestionsItemProps {
	question: Question;
}

export const InterviewQuestionsItem = ({ question }: InterviewQuestionsItemProps) => {
	const { id, imageSrc, title, rate, complexity = 0 } = question;

	const { t } = useTranslation(i18Namespace.questions);

	return (
		<li className={styles.item}>
			<Link to={route(ROUTES.interview.questions.detail.page, id)} className={styles.link}>
				<ImageWithWrapper src={imageSrc} />
				<div className={styles.info}>
					<h4 className={styles.title}>{title}</h4>
					<ul className={styles.params}>
						<QuestionParam label={t(Questions.RATE_TITLE_SHORT)} value={rate} />
						<QuestionParam label={t(Questions.COMPLEXITY_TITLE_SHORT)} value={complexity} />
					</ul>
				</div>
			</Link>
		</li>
	);
};
