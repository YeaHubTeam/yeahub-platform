import classNames from 'classnames';
import { FC } from 'react';

import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';

import styles from './InterviewQuestionHeader.module.css';

interface Props {
	title: string;
	linkTitle?: string;
	centered?: boolean;
}

export const InterviewQuestionHeader: FC<Props> = ({ title, linkTitle, centered = false }) => {
	return (
		<div className={styles.header}>
			<h3 className={classNames(styles['header-title'], { [styles.centered]: centered })}>
				{title}
			</h3>
			{!!linkTitle && <LinkWithArrowRight link="/questions" linkTitle={linkTitle} />}
		</div>
	);
};
