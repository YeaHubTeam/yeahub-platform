import { Link } from 'react-router-dom';
import { Tooltip } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import { Question } from '@/entities/question';

import styles from './InterviewQuestionsItem.module.css';

interface InterviewQuestionsItemProps {
	question: Question;
}

export const InterviewQuestionsItem = ({ question }: InterviewQuestionsItemProps) => {
	const { id, imageSrc, title, rate, complexity = 0 } = question;

	const { t } = useI18nHelpers(i18Namespace.interview);
	return (
		<li className={styles.item}>
			<Link to={route(ROUTES.interview.questions.detail.page, id)} className={styles.link}>
				<ImageWithWrapper src={imageSrc} />
				<div className={styles.info}>
					<Tooltip title={title}>
						<h4 className={styles.title}>{title}</h4>
					</Tooltip>
					<ul className={styles.params}>
						<QuestionParam label={t('questions.rating')} value={rate} />
						<QuestionParam label={t('questions.complexity')} value={complexity} />
					</ul>
				</div>
			</Link>
		</li>
	);
};
