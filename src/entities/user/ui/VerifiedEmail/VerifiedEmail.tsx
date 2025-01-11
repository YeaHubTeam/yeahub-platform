import { useTranslation } from 'react-i18next';
import { Switch } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';

import styles from './VerifiedEmail.module.css';

interface VerifiedEmailProps {
	selectedVerifiedEmail?: boolean | null;
	onChangeVerifiedEmail: (isVerified: boolean) => void;
}

export const VerifiedEmail = ({
	selectedVerifiedEmail,
	onChangeVerifiedEmail,
}: VerifiedEmailProps) => {
	const { t } = useTranslation(i18Namespace.user);
	const handleSwitchChange = (e: React.ChangeEvent<Element>) => {
		onChangeVerifiedEmail((e.target as HTMLInputElement).checked);
	};

	return (
		<Switch
			className={styles.switch}
			checked={selectedVerifiedEmail ?? false}
			onChange={handleSwitchChange}
			label={t('filter.email.title')}
		/>
	);
};
