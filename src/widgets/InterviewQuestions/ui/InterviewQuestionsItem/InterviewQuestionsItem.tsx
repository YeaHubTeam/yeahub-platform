import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import { Question } from '@/entities/question';

import styles from './InterviewQuestionsItem.module.css';

interface Props {
	question: Question;
}

export const InterviewQuestionsItem: FC<Props> = ({ question }) => {
	const { id, imageSrc, title, rate, rating } = question;
	return (
		<li className={styles.item}>
			<Link to={`/questions/${id}`} className={styles.link}>
				<ImageWithWrapper src={imageSrc} />
				<div className={styles.info}>
					<h4 className={styles.title}>{title}</h4>
					<ul className={styles.params}>
						<QuestionParam label="Рейтинг" value={rating} />
						<QuestionParam label="Сложность" value={rate} />
					</ul>
				</div>
			</Link>
		</li>
	);
};
