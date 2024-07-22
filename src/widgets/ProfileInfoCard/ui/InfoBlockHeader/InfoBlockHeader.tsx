import { Button } from 'yeahub-ui-kit';

import styles from './InfoBlockHeader.module.css';

export const InfoBlockHeader = () => {
	return (
		<div className={styles['info-header']}>
			<h3 className={styles['info-title']}>Обо мне</h3>
			<Button theme="link" tagName="button" className={styles['info-edit']}>
				Редактировать
			</Button>
		</div>
	);
};
