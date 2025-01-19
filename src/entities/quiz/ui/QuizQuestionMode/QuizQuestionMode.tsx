import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizCreate } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { QuestionModeType } from '../../model/types/quiz';

interface QuizQuestionModeProps {
	onChangeMode: (complexity: QuestionModeType) => void;
	modeFromURL?: QuestionModeType;
}

interface QuizQuestionModeData {
	id: number;
	value: QuestionModeType;
	title: string;
	active: boolean;
}

export const QuizQuestionMode = ({ onChangeMode, modeFromURL }: QuizQuestionModeProps) => {
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
		if (modeFromURL) {
			const updatedModeData = quizQuestionMode.map((mode) => ({
				...mode,
				active: mode.value === modeFromURL,
			}));
			setQuizQuestionMode(updatedModeData);
		}
	}, [modeFromURL]);

	return (
		<BaseFilterSection
			data={quizQuestionMode}
			title={t(InterviewQuizCreate.MODE_SELECT)}
			onClick={onChooseMode}
		/>
	);
};
