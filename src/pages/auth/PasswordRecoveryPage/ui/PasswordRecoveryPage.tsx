import { PasswordRecovery } from '@/widgets/authentication/passwordRecovery';
import { Header } from '@/widgets/Landing/OldHeader';

import styles from './PasswordRecoveryPage.module.css';

const PasswordRecoveryPage = () => {
	return (
		<>
			<div className={styles.header}>
				<Header hasOnlyLogo />
			</div>
			<PasswordRecovery />
		</>
	);
};

export default PasswordRecoveryPage;
