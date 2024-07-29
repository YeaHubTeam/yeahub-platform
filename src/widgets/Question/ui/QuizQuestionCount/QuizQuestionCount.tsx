import { useState } from 'react';

import { Counter } from '@/shared/ui/Counter';

interface QuizQuestionCountProps {
	onChangeLimit: (limit: number) => void;
}

export const QuizQuestionCount = ({ onChangeLimit }: QuizQuestionCountProps) => {
	const [counter, setCounter] = useState(1);

	const handleClick = (counter: number) => {
		setCounter(counter);
		onChangeLimit(counter);
	};

	return (
		<div>
			<h3> Количество вопросов</h3>
			<Counter count={counter} onChange={handleClick} />
		</div>
	);
};
