import { Button } from 'yeahub-ui-kit';

import cls from './NextBtn.module.css';

export const NextBtn = () => {
	return (
		<div className={cls['btn-container']}>
			<Button>Сохранить</Button>
		</div>
	);
};