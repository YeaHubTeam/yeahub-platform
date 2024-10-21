import { Chip, Icon } from 'yeahub-ui-kit';
import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { Answers, QuizQuestionAnswerType } from '@/entities/quiz';

import styles from './PassedQuestionsItem.module.css';

interface Props {
	question: Answers;
}

interface MappingItem {
	label: string;
	icon: IconsName;
}

export const PassedQuestionsItem = ({ question }: Props) => {
	const { answer, questionTitle } = question;
	const mapping: Record<QuizQuestionAnswerType, MappingItem> = {
		REPEAT: {
			label: Translation.PASSEDQUESTIONS_REPEAT,
			icon: 'clockCounterClockwise',
		},
		UNKNOWN: {
			label: Translation.PASSEDQUESTIONS_DONTKNOW,
			icon: 'thumbsDown',
		},
		KNOWN: {
			label: Translation.PASSEDQUESTIONS_IKNOW,
			icon: 'thumbsUp',
		},
	};
	const { t } = useI18nHelpers();

	return (
		<li>
			<article className={styles.item}>
				<div className={styles.info}>
					<h4 className={styles.title}>{questionTitle}</h4>
					<Chip
						theme="outlined"
						className={styles['action-btn-tmp']}
						preffix={<Icon key={mapping[answer].icon} icon={mapping[answer].icon} size={24} />}
						label={t(mapping[answer].label)}
					/>
				</div>
			</article>
		</li>
	);
};
