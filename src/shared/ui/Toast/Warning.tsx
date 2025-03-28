import classNames from 'classnames';
import { Toast } from 'react-hot-toast';

import { Icon } from '@/shared/ui/Icon';

import { CloseBtn } from './CloseBtn';
import styles from './styles.module.css';

const TOAST_TITLE = 'Warning';

interface WarningProps {
	currentToast: Toast;
	message: JSX.Element | string | null;
}

export const Warning = ({ currentToast, message }: WarningProps) => {
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
				<span className={classNames(styles.title, styles['warning-title'])}>{TOAST_TITLE}</span>
				{message}
			</div>
			<CloseBtn toastId={currentToast.id} />
		</div>
	);
};
