import { useState } from 'react';

import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { QuestionModeType } from '../../model/types/quiz';

interface QuizQuestionModeProps {
	onChangeMode: (complexity: QuestionModeType) => void;
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

export const QuizQuestionMode = ({ onChangeMode }: QuizQuestionModeProps) => {
	const [quizQuestionMode, setQuizQuestionMode] = useState(quizQuestionModeData);

	const handleChooseMode = (id: number) => {
		const newValue = quizQuestionMode.find((mode) => mode.id === id);
		const updatedModeData = quizQuestionMode.map((mode) => {
			return {
				...mode,
				active: mode.id === id,
			};
		});
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
