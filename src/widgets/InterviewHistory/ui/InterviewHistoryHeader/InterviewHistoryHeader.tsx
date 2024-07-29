import { FC } from 'react';

import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';

import styles from './InterviewHistoryHeader.module.css';

interface Props {
	title: string;
	linkTitle?: string;
}

export const InterviewHistoryHeader: FC<Props> = ({ title, linkTitle }) => {
	return (
		<div className={styles.header}>
			<h3 className={styles['header-title']}>{title}</h3>
			{!!linkTitle && <LinkWithArrowRight link="questions" linkTitle={linkTitle} />}
		</div>
	);
};
