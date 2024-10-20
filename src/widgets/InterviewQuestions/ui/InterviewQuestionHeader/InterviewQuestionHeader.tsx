import classNames from 'classnames';

import styles from './InterviewQuestionHeader.module.css';

interface InterviewQuestionHeaderProps {
	title: string;
	linkTitle?: string;
	centered?: boolean;
}

export const InterviewQuestionHeader = ({
	title,
	centered = false,
}: InterviewQuestionHeaderProps) => {
	return (
		<div className={classNames(styles.header, { [styles.centered]: centered })}>
			<h3 className={styles['header-title']}>{title}</h3>
		</div>
	);
};
