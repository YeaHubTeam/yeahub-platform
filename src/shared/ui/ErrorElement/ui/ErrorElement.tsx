import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { Card } from '@/shared/ui/Card';

import styles from './ErrorElement.module.css';

interface ErrorElementProps {
	fetchError?: FetchBaseQueryError | SerializedError;
	errorMsg?: string;
}

export const ErrorElement = ({
	fetchError,
	errorMsg = 'Неизвестная ошибка',
}: ErrorElementProps) => {
	const navigate = useNavigate();

	const handleBackBtnClick = () => navigate(-1);

	return (
		<Card className={styles.card}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<h2 className={styles.title}>УПС!</h2>
					<span className={styles.text}>Что-то пошло не так</span>
					<span className={styles['error-msg']}>
						Ошибка: {fetchError && 'status' in fetchError ? fetchError.status : errorMsg}
					</span>
				</div>
				<Button size="large" onClick={handleBackBtnClick}>
					Вернуться назад
				</Button>
			</div>
		</Card>
	);
};
