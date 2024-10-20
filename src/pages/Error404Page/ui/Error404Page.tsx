import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { Card } from '@/shared/ui/Card';

import styles from './Error404Page.module.css';

const Error404Page = () => {
	const navigate = useNavigate();

	const handleBackBtnClick = () => navigate(-1);

	return (
		<Card>
			<div className={styles.wrapper}>
				<img src="/images/404.png" alt="Ошибка 404" className={styles.img} />
				<div className={styles.content}>
					<h2 className={styles.title}>Произошла ошибка</h2>
					<Button size="large" onClick={handleBackBtnClick}>
						Вернуться назад
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default Error404Page;
