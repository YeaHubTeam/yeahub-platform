import { useState } from 'react';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { QuestionModeType } from '@/pages/CreateQuizPage';

import { BaseFilterSection } from '../QuestionsFilterPanel/ui/BaseFilterSection/BaseFilterSection';

interface QuizQuestionModeProps {
	onChangeMode: (complexity: QuestionModeType) => void;
}

const quizQuestionModeData = [
	{ id: 1, value: 'REPEAT', title: 'Повторение', active: false },
	{ id: 2, value: 'NEW', title: 'Только новые', active: true },
	{ id: 3, value: 'RANDOM', title: 'Случайные', active: false },
];

export const QuizQuestionMode = ({ onChangeMode }: QuizQuestionModeProps) => {
	const [quizQuestionMode, setQuizQuestionMode] = useState(quizQuestionModeData);

	const handleChooseMode = (id: number) => {
		const newValue = quizQuestionMode.find((mode) => mode.id === id);
		const updatedModeData = quizQuestionMode.map((mode) => {
			if (mode.id === id) {
				return {
					...mode,
					active: true,
				};
			}
			return {
				...mode,
				active: false,
			};
		});
		setQuizQuestionMode(updatedModeData);
		if (newValue) {
			const value = newValue.value as QuestionModeType;
			onChangeMode(value);
		}
	};

	return (
		<BaseFilterSection data={quizQuestionMode} title="Выберите режим" onClick={handleChooseMode} />
	);
};
