import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import styles from './Error404Page.module.css';

const Error404Page = () => {
	const navigate = useNavigate();

	const handleBackBtnClick = () => navigate(-1);
	const { t } = useI18nHelpers(i18Namespace.translation);

	return (
		<Card className={styles.wrapper}>
			<div>
				<img src="/images/404.png" alt={t(Translation.ERROR404_IMAGE_ALT)} className={styles.img} />
				<div className={styles.content}>
					<h2 className={styles.title}>Произошла ошибка</h2>
					<Button size="L" onClick={handleBackBtnClick}>
						Вернуться назад
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default Error404Page;
