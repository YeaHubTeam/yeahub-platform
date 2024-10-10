import { Icon, Chip } from 'yeahub-ui-kit';
import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { Answers, QuizQuestionAnswerType } from '@/entities/quiz';

import styles from './PassedQuestionsItem.module.css';

type Label = 'Повторить' | 'Не знаю' | 'Знаю';

interface Props {
	question: Answers;
}

interface MappingItem {
	label: Label;
	icon: IconsName;
}

export const PassedQuestionsItem = ({ question }: Props) => {
	const { answer, questionTitle } = question;
	const mapping: Record<QuizQuestionAnswerType, MappingItem> = {
		REPEAT: {
			label: 'Повторить',
			icon: 'clockCounterClockwise',
		},
		UNKNOWN: {
			label: 'Не знаю',
			icon: 'thumbsDown',
		},
		KNOWN: {
			label: 'Знаю',
			icon: 'thumbsUp',
		},
	};

	return (
		<li>
			<article className={styles.item}>
				<div className={styles.info}>
					<h4 className={styles.title}>{questionTitle}</h4>
					<Chip
						theme="outlined"
						className={styles['action-btn-tmp']}
						preffix={<Icon key={mapping[answer].icon} icon={mapping[answer].icon} size={24} />}
						label={mapping[answer].label}
					/>
				</div>
			</article>
		</li>
	);
};
