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
		<div className={classNames(styles.header, { [styles.centered]: centered })}>
			<h3 className={styles['header-title']}>{title}</h3>
			{!!linkTitle && <LinkWithArrowRight link="/questions" linkTitle={linkTitle} />}
		</div>
	);
};
