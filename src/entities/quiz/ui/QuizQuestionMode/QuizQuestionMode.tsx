import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizCreate } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Tooltip } from '@/shared/ui/Tooltip';

import { QuestionModeType } from '../../model/types/quiz';

interface QuizQuestionModeProps {
	onChangeMode: (complexity: QuestionModeType) => void;
	modeFromURL?: QuestionModeType;
	disabled?: boolean;
	active?: boolean;
	hasPremium?: boolean;
}

interface QuizQuestionModeData {
	id: number;
	value: QuestionModeType;
	title: string;
	active: boolean;
}

export const QuizQuestionMode = ({
	onChangeMode,
	modeFromURL,
	disabled,
	hasPremium,
}: QuizQuestionModeProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuizCreate);

	const quizQuestionModeData: QuizQuestionModeData[] = [
		{ id: 1, value: 'REPEAT', title: t(InterviewQuizCreate.MODE_REPEAT), active: false },
		{ id: 2, value: 'NEW', title: t(InterviewQuizCreate.MODE_NEW), active: false },
		{ id: 3, value: 'RANDOM', title: t(InterviewQuizCreate.MODE_RANDOM), active: false },
	];

	const [quizQuestionMode, setQuizQuestionMode] = useState(quizQuestionModeData);

	const onChooseMode = (id: number) => {
		const newValue = quizQuestionMode.find((mode) => mode.id === id);
		const updatedModeData = quizQuestionMode.map((mode) => ({
			...mode,
			active: mode.id === id,
		}));
		setQuizQuestionMode(updatedModeData);
		if (newValue) {
			const value = newValue.value;
			onChangeMode(value);
		}
	};

	useEffect(() => {
		if (modeFromURL && !disabled) {
			const updatedModeData = quizQuestionMode.map((mode) => ({
				...mode,
				active: mode.value === modeFromURL,
			}));
			setQuizQuestionMode(updatedModeData);
		}
	}, [modeFromURL, disabled]);

	const tooltipTitle = !hasPremium
		? t(InterviewQuizCreate.MODE_SELECT_TOOLTIP_PREMIUMONLY)
		: t(InterviewQuizCreate.MODE_SELECT_TOOLTIP_UNAUTHORIZED);

	return (
		<div style={{ maxWidth: '384px' }}>
			<Tooltip
				title={tooltipTitle}
				placement="top"
				color="violet"
				offsetTooltip={0}
				tooltipDelay={{ open: 0, close: 150 }}
				shouldShowTooltip={disabled || false}
			>
				<BaseFilterSection
					data={quizQuestionMode}
					title={t(InterviewQuizCreate.MODE_SELECT)}
					onClick={onChooseMode}
					disabled={disabled}
				/>
			</Tooltip>
		</div>
	);
};
