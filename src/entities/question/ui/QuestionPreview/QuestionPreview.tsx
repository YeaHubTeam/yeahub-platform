import { NavLink, useMatch } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { QuestionParam } from '@/shared/ui/QuestionParam';

import { Question } from '../../model/types/question';

import styles from './QuestionPreview.module.css';

type QuestionProps = {
	question: Question;
};

export const QuestionPreview = ({ question }: QuestionProps) => {
	const { id, imageSrc, rate, rating, shortAnswer } = question;
	const match = useMatch('/interview/questions/*');

	const baseUrl = match?.pathnameBase || '/interview/questions';

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles['header-params']}>
					<QuestionParam label="Рейтинг" value={rating} />
					<QuestionParam label="Сложность" value={rate} />
				</div>
				<div>
					<Button className={styles.details} theme="link">
						<NavLink to={`${baseUrl}/${id}`}>Подробнее</NavLink>
					</Button>
				</div>
			</div>
			{imageSrc && <img className={styles.image} alt={'asdasd'} src={imageSrc} />}
			<div className={styles.content}>{shortAnswer}</div>
		</div>
	);
};
