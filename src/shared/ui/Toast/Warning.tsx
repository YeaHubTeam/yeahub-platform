import classNames from 'classnames';
import { Toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Icon } from '@/shared/ui/Icon';

import { CloseBtn } from './CloseBtn';
import styles from './styles.module.css';

interface WarningProps {
	currentToast: Toast;
	message: JSX.Element | string | null;
}

export const Warning = ({ currentToast, message }: WarningProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	return (
		<div
			className={classNames(
				styles.toaster,
				styles.warning,
				currentToast.visible ? styles['fade-in'] : styles['fade-out'],
			)}
		>
			<Icon icon="warning" color="yellow-900" />
			<div className={styles['toaster-text-wrapper']}>
				<span className={classNames(styles.title, styles['warning-title'])}>
					{t(Translation.TOAST_TITLE_WARNING, { ns: 'translation' })}
				</span>
				{message}
			</div>
			<CloseBtn toastId={currentToast.id} />
		</div>
	);
};
