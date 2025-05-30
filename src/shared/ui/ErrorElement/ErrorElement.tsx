import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import styles from './ErrorElement.module.css';

interface ErrorElementProps {
	fetchError?: FetchBaseQueryError | SerializedError;
	errorMsg?: string;
	path?: string | number;
}

export const ErrorElement = ({
	fetchError,
	errorMsg = 'Неизвестная ошибка',
	path = -1,
}: ErrorElementProps) => {
	const navigate = useNavigate();

	const handleBackBtnClick = () => {
		if (typeof path === 'number') {
			navigate(path);
			return;
		}

		navigate(path);
	};

	return (
		<Card className={styles.card}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<h2 className={styles.title}>УПС!</h2>
					<span className={styles.text}>Что-то пошло не так</span>
					{fetchError ? (
						<span className={styles['error-msg']}>
							Ошибка: {fetchError && 'status' in fetchError ? fetchError.status : errorMsg}
						</span>
					) : null}
				</div>
				<Button size="large" onClick={handleBackBtnClick}>
					Вернуться назад
				</Button>
			</div>
		</Card>
	);
};
