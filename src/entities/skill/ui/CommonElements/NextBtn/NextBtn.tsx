import { BaseSyntheticEvent } from 'react';
import { Button } from 'yeahub-ui-kit';

import cls from './NextBtn.module.css';

interface NextBtnProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleClick?: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

export const NextBtn = ({ handleClick }: NextBtnProps) => {
	return (
		<div className={cls['btn-container']}>
			<Button onClick={handleClick}>Сохранить</Button>
		</div>
	);
};
