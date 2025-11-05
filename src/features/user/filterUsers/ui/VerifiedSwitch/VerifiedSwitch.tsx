import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { Switch } from '@/shared/ui/Switch';

import styles from './VerifiedSwitch.module.css';

interface VerifiedSwitchProps {
	selectedVerified?: boolean | null;
	onChangeVerified: (isVerified: boolean) => void;
}

export const VerifiedSwitch = ({ selectedVerified, onChangeVerified }: VerifiedSwitchProps) => {
	const { t } = useTranslation(i18Namespace.user);
	const handleSwitchChange = (e: React.ChangeEvent<Element>) => {
		onChangeVerified((e.target as HTMLInputElement).checked);
	};

	return (
		<Switch
			className={styles.switch}
			checked={selectedVerified ?? false}
			onChange={handleSwitchChange}
			label={t(User.FILTER_EMAIL)}
		/>
	);
};
