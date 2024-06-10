import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { Block } from '@/shared/ui/Block';

import styles from './ErrorElement.module.css';

interface Props {
	fetchError?: FetchBaseQueryError | SerializedError;
	errorMsg?: string;
}

export const ErrorElement: FC<Props> = ({ fetchError, errorMsg = 'Неизвестная ошибка' }) => {
	const navigate = useNavigate();

	return (
		<Block className={styles.block}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<h2 className={styles.title}>УПС!</h2>
					<span className={styles.text}>Что-то пошло не так</span>
					<span className={styles['error-msg']}>
						Ошибка: {fetchError && 'status' in fetchError ? fetchError.status : errorMsg}
					</span>
				</div>
				<Button size="large" onClick={() => navigate(-1)}>
					Вернуться назад
				</Button>
			</div>
		</Block>
	);
};
