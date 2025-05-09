import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { Switch } from '@/shared/ui/Switch';

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
			label={t(User.FILTER_EMAIL)}
		/>
	);
};
