import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';

import styles from './InterviewPreparationHeader.module.css';

interface InterviewPreparationHeaderProps {
	title: string;
	linkTitle?: string;
}

export const InterviewPreparationHeader = ({
	title,
	linkTitle,
}: InterviewPreparationHeaderProps) => {
	return (
		<div className={styles.header}>
			<h3 className={styles['header-title']}>{title}</h3>
			{!!linkTitle && <LinkWithArrowRight link="quiz" linkTitle={linkTitle} />}
		</div>
	);
};
