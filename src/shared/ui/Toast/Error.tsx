import classNames from 'classnames';
import { Toast } from 'react-hot-toast';
import { Icon } from 'yeahub-ui-kit';

import { CloseBtn } from './CloseBtn';
import styles from './styles.module.css';

const TOAST_TITLE = 'Error';

interface WarningProps {
	currentToast: Toast;
	message: JSX.Element | string | null;
}

export const Error = ({ currentToast, message }: WarningProps) => {
	return (
		<div
			className={classNames(
				styles.toaster,
				styles.error,
				currentToast.visible ? styles['fade-in'] : styles['fade-out'],
			)}
		>
			<Icon icon="xCircle" color="--palette-ui-red-700" />
			<div className={styles['toaster-text-wrapper']}>
				<span className={classNames(styles.title, styles['error-title'])}>{TOAST_TITLE}</span>
				{message}
			</div>
			<CloseBtn toastId={currentToast.id} />
		</div>
	);
};
