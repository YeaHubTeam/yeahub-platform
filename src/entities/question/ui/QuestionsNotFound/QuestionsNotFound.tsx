import { Button } from 'yeahub-ui-kit';

import styles from './QuestionsNotFound.module.css';

interface QuestionsNotFoundProps {
	resetFilters: () => void;
}

export const QuestionsNotFound = ({ resetFilters }: QuestionsNotFoundProps) => {
	return (
		<>
			<p className={styles.text}>
				К сожалению, ничего не найдено. Попробуйте изменить запрос или воспользуйтесь нашими
				категориями.
			</p>
			<Button size="large" theme="primary" onClick={() => resetFilters()}>
				Сбросить фильтр
			</Button>
		</>
	);
};
