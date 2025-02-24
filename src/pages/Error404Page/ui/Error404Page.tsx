import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import styles from './Error404Page.module.css';

const Error404Page = () => {
	const navigate = useNavigate();

	const handleBackBtnClick = () => navigate(-1);

	return (
		<Card className={styles.wrapper}>
			<div>
				<img src="/images/404.avif" alt="Ошибка 404: страница не найдена" loading="lazy" />
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
