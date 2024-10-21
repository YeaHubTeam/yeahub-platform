import { useEffect, useState } from 'react';

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

const quizQuestionModeData: QuizQuestionModeData[] = [
	{ id: 1, value: 'REPEAT', title: 'Повторение', active: false },
	{ id: 2, value: 'NEW', title: 'Только новые', active: false },
	{ id: 3, value: 'RANDOM', title: 'Случайные', active: false },
];

export const QuizQuestionMode = ({ onChangeMode, modeFromURL }: QuizQuestionModeProps) => {
	const [quizQuestionMode, setQuizQuestionMode] = useState(quizQuestionModeData);

	useEffect(() => {
		if (modeFromURL) {
			const updatedModeData = quizQuestionMode.map((mode) => ({
				...mode,
				active: mode.value === modeFromURL,
			}));
			setQuizQuestionMode(updatedModeData);
		}
	}, [modeFromURL]);

	const handleChooseMode = (id: number) => {
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

	return (
		<BaseFilterSection data={quizQuestionMode} title="Выберите режим" onClick={handleChooseMode} />
	);
};
