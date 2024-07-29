import { FC } from 'react';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import { Question } from '@/entities/question';

import styles from './InterviewQuestionsItem.module.css';

interface Props {
	question: Question;
}

export const InterviewQuestionsItem: FC<Props> = ({ question }) => {
	const { id, imageSrc, title, rate, rating } = question;
	const { t } = useI18nHelpers(i18Namespace.interview);
	return (
		<li className={styles.item}>
			<Link to={`interview/questions/${id}`} className={styles.link}>
				<ImageWithWrapper src={imageSrc} />
				<div className={styles.info}>
					<h4 className={styles.title}>{title}</h4>
					<ul className={styles.params}>
						<QuestionParam label={t('questions.rating')} value={rating} />
						<QuestionParam label={t('questions.complexity')} value={rate} />
					</ul>
				</div>
			</Link>
		</li>
	);
};
