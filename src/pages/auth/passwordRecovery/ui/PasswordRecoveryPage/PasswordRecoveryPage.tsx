import { ROUTES } from '@/shared/config';
import { AppLogo } from '@/shared/ui/AppLogo';

import { PasswordRecovery } from '@/widgets/authentication/passwordRecovery';

import styles from './PasswordRecoveryPage.module.css';

const PasswordRecoveryPage = () => {
	return (
		<>
			<div className={styles.header}>
				<AppLogo navigateTo={ROUTES.appRoute} />
			</div>
			<PasswordRecovery />
		</>
	);
};

export default PasswordRecoveryPage;
