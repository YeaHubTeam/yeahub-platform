import { Counter } from '@/shared/ui/Counter';

import styles from './ChooseQuestionCount.module.css';

interface ChooseQuestionCountProps {
	onChangeLimit: (limit: number) => void;
	count: number;
}

export const ChooseQuestionCount = ({ onChangeLimit, count }: ChooseQuestionCountProps) => {
	const handleClick = (counter: number) => {
		onChangeLimit(counter);
	};

	return (
		<div>
			<h3 className={styles.title}> Количество вопросов</h3>
			<Counter count={count} onChange={handleClick} />
		</div>
	);
};
