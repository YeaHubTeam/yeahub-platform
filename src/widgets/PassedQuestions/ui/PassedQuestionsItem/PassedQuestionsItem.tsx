import { Button, Icon } from 'yeahub-ui-kit';
import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

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
	const { imageSrc, answer, questionTitle } = question;
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
				<ImageWithWrapper src={imageSrc} className={styles.img} />
				<div className={styles.info}>
					<h4 className={styles.title}>{questionTitle}</h4>
					<Button
						className={styles['action-btn']}
						theme="tertiary"
						size="small"
						preffix={<Icon key={mapping[answer].icon} icon={mapping[answer].icon} size={24} />}
					>
						{mapping[answer].label}
					</Button>
				</div>
			</article>
		</li>
	);
};
