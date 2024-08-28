import classNames from 'classnames';
import { FC } from 'react';

import styles from './InterviewQuestionHeader.module.css';

interface Props {
	title: string;
	linkTitle?: string;
	centered?: boolean;
}

export const InterviewQuestionHeader: FC<Props> = ({ title, centered = false }) => {
	return (
		<div className={classNames(styles.header, { [styles.centered]: centered })}>
			<h3 className={styles['header-title']}>{title}</h3>
		</div>
	);
};
