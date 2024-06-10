import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { Block } from '@/shared/ui/Block';

import styles from './Error404Page.module.css';

const Error404Page = () => {
	const navigate = useNavigate();

	return (
		<Block>
			<div className={styles.wrapper}>
				<img src="/images/404.png" alt="Ошибка 404" className={styles.img} />
				<div className={styles.content}>
					<h2 className={styles.title}>Произошла ошибка</h2>
					<Button size="large" onClick={() => navigate(-1)}>
						Вернуться назад
					</Button>
				</div>
			</div>
		</Block>
	);
};

export default Error404Page;
