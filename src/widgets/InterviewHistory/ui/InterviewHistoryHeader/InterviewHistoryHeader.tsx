import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';

import styles from './InterviewHistoryHeader.module.css';

interface InterviewHistoryHeaderProps {
	title: string;
	linkTitle?: string;
}

export const InterviewHistoryHeader = ({ title, linkTitle }: InterviewHistoryHeaderProps) => {
	return (
		<div className={styles.header}>
			<h3 className={styles['header-title']}>{title}</h3>
			{!!linkTitle && <LinkWithArrowRight link="/interviewHistory" linkTitle={linkTitle} />}
		</div>
	);
};
