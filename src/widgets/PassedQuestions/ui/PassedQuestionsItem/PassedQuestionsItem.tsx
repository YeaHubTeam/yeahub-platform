import { Button, Icon } from 'yeahub-ui-kit';

import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { InterviewQuestion } from '@/entities/interview';

import styles from './PassedQuestionsItem.module.css';

interface Props {
	question: InterviewQuestion;
}

export const PassedQuestionsItem = ({ question }: Props) => {
	const { img, result, title } = question;

	return (
		<li>
			<article className={styles.item}>
				<ImageWithWrapper src={img} className={styles.img} />
				<div className={styles.info}>
					<h4 className={styles.title}>{title}</h4>

					{result === 'Знаю' ? (
						<Button
							textClassName={styles['action-btn']}
							theme="tertiary"
							size="small"
							preffix={<Icon key="thumbsUp" icon="thumbsUp" size={24} />}
						>
							{result}
						</Button>
					) : result === 'Не знаю' ? (
						<Button
							textClassName={styles['action-btn']}
							theme="tertiary"
							size="small"
							preffix={<Icon key="thumbsDown" icon="thumbsDown" size={24} />}
						>
							{result}
						</Button>
					) : (
						<Button
							textClassName={styles['action-btn']}
							theme="tertiary"
							size="small"
							preffix={<Icon key="clockCounterClockwise" icon="clockCounterClockwise" size={24} />}
						>
							{result}
						</Button>
					)}
				</div>
			</article>
		</li>
	);
};
