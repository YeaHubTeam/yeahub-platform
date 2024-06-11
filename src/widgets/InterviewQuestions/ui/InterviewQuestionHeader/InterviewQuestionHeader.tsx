import { FC } from 'react';
import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/shared/assets/icons/arrowRight.svg';

import styles from './InterviewQuestionHeader.module.css';

interface Props {
	title: string;
	linkTitle?: string;
}

export const InterviewQuestionHeader: FC<Props> = ({ title, linkTitle }) => {
	return (
		<div className={styles.header}>
			<h3 className={styles['header-title']}>{title}</h3>
			{linkTitle && (
				<Link to="/questions" className={styles.link}>
					<span>{linkTitle}</span>
					<ArrowRightIcon className={styles.icon} />
				</Link>
			)}
		</div>
	);
};
