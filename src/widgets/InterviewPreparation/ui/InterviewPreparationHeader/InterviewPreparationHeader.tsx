import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';

import styles from './InterviewPreparationHeader.module.css';

interface Props {
	title: string;
	linkTitle?: string;
}

export const InterviewPreparationHeader = ({ title, linkTitle }: Props) => {
	return (
		<div className={styles.header}>
			<h3 className={styles['header-title']}>{title}</h3>
			{!!linkTitle && <LinkWithArrowRight link="/interviewQuiz" linkTitle={linkTitle} />}
		</div>
	);
};
