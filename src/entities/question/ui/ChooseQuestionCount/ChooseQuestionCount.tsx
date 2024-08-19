import { useState } from 'react';

import { Counter } from '@/shared/ui/Counter';

import styles from './ChooseQuestionCount.module.css';

interface ChooseQuestionCountProps {
	onChangeLimit: (limit: number) => void;
}

export const ChooseQuestionCount = ({ onChangeLimit }: ChooseQuestionCountProps) => {
	const [counter, setCounter] = useState(1);

	const handleClick = (counter: number) => {
		setCounter(counter);
		onChangeLimit(counter);
	};

	return (
		<div>
			<h3 className={styles.title}> Количество вопросов</h3>
			<Counter count={counter} onChange={handleClick} />
		</div>
	);
};
