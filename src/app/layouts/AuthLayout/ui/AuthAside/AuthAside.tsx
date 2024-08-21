import { AppLogo } from '@/shared/ui/AppLogo';

import { BenefitsList } from '../BenefitsList/BenefitsList';

import styles from './AuthAside.module.css';

export const AuthAside = () => {
	return (
		<aside className={styles.wrapper}>
			<div className={styles['heading-wrapper']}>
				<div className={styles['logo-wrapper']}>
					<AppLogo isOpen={false} fill="white" />
				</div>
				<p className={styles['logo-text']}>YeaHub объединяет IT-специалистов</p>
			</div>
			<BenefitsList />
		</aside>
	);
};
