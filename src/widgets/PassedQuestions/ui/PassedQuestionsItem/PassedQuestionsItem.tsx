import { Button, Icon } from 'yeahub-ui-kit';

import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { INTERVIEW_BTNS_DATA, InterviewQuestion } from '@/entities/interview';

import styles from './PassedQuestionsItem.module.css';

interface Props {
	question: InterviewQuestion;
}

export const PassedQuestionsItem = ({ question }: Props) => {
	const { img, result, title } = question;
	const { label, icon } = INTERVIEW_BTNS_DATA.find((item) => item.result === result)!;

	return (
		<li>
			<article className={styles.item}>
				<ImageWithWrapper src={img} className={styles.img} />
				<div className={styles.info}>
					<h4 className={styles.title}>{title}</h4>
					<Button
						className={styles['action-btn']}
						theme="tertiary"
						size="small"
						preffix={<Icon key={icon} icon={icon} size={24} />}
					>
						{label}
					</Button>
				</div>
			</article>
		</li>
	);
};
