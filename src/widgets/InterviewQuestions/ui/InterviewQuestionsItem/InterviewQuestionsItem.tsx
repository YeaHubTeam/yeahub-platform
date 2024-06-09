import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { QuestionParam } from '@/shared/ui/QuestionParam';
import { QuestionParamProps as IQuestionParam } from '@/shared/ui/QuestionParam/QuestionParam';

import styles from './InterviewQuestionsItem.module.css';

export interface Props {
	link: string;
	title: string;
	params: IQuestionParam[];
	src?: string;
}

export const InterviewQuestionsItem: FC<Props> = ({ link, src, title, params }) => {
	return (
		<li className={styles.item}>
			<Link to={`/interview/${link}`} className={styles.link}>
				<ImageWithWrapper src={src} />
				<div className={styles.info}>
					<h4 className={styles.title}>{title}</h4>
					<ul className={styles.params}>
						{params.map((param, index) => (
							<QuestionParam key={index} {...param} />
						))}
					</ul>
				</div>
			</Link>
		</li>
	);
};
