import classNames from 'classnames';
import { Toast } from 'react-hot-toast';
import { Icon } from 'yeahub-ui-kit';

import { CloseBtn } from './CloseBtn';
import styles from './styles.module.css';

const TOAST_TITLE = 'Success';

interface WarningProps {
	currentToast: Toast;
	message: JSX.Element | string | null;
}

export const Success = ({ currentToast, message }: WarningProps) => {
	return (
		<div
			className={classNames(
				styles.toaster,
				styles.success,
				currentToast.visible ? styles['fade-in'] : styles['fade-out'],
			)}
		>
			<Icon icon="checkCircle" color="--palette-ui-green-900" />
			<div className={styles['toaster-text-wrapper']}>
				<span className={classNames(styles.title, styles['success-title'])}>{TOAST_TITLE}</span>
				{message}
			</div>
			<CloseBtn toastId={currentToast.id} />
		</div>
	);
};
