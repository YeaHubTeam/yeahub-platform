import { FC } from 'react';

import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';

import styles from './InterviewQuestionHeader.module.css';

interface Props {
	title: string;
	linkTitle?: string;
}

export const InterviewQuestionHeader: FC<Props> = ({ title, linkTitle }) => {
	return (
		<div className={styles.header}>
			<h3 className={styles['header-title']}>{title}</h3>
			{Boolean(linkTitle) && <LinkWithArrowRight link="/questions" linkTitle={linkTitle} />}
		</div>
	);
};
