import { Header } from '../Header/Header';
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery';

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
