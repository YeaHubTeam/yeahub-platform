import cn from 'classnames';
import t, { DefaultToastOptions } from 'react-hot-toast';
import { Icon } from 'yeahub-ui-kit';

import styles from './styles.module.css';

export const ToastOptions: DefaultToastOptions = {
	custom: {
		duration: 50000,
		position: 'top-right',
	},
};

const DURATION_TOAST = 5000;

const TOAST_TITLE = {
	success: 'Success',
	error: 'Error',
	warn: 'Warning',
};

const CloseBtn = ({ toastId }: { toastId: string }) => (
	<button onClick={() => t.dismiss(toastId)} className={styles['close-btn']}>
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1L9 9" stroke="#303030" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9 1L1 9" stroke="#303030" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	</button>
);

export const toast = {
	error: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => {
				return (
					<div
						className={cn(
							styles.toaster,
							styles.error,
							currentToast.visible ? styles['fade-in'] : styles['fade-out'],
						)}
					>
						<Icon icon="xCircle" color="--palette-ui-red-700" />
						<div className={styles['toaster-text-wrapper']}>
							<span className={cn(styles.title, styles['error-title'])}>{TOAST_TITLE.error}</span>
							{message}
						</div>
						<CloseBtn toastId={currentToast.id} />
					</div>
				);
			},

			{
				duration: DURATION_TOAST,
				...args,
			},
		),
	success: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => {
				return (
					<div
						className={cn(
							styles.toaster,
							styles.success,
							currentToast.visible ? styles['fade-in'] : styles['fade-out'],
						)}
					>
						<Icon icon="checkCircle" color="--palette-ui-green-900" />
						<div className={styles['toaster-text-wrapper']}>
							<span className={cn(styles.title, styles['success-title'])}>
								{TOAST_TITLE.success}
							</span>
							{message}
						</div>
						<CloseBtn toastId={currentToast.id} />
					</div>
				);
			},

			{
				duration: DURATION_TOAST,
				...args,
			},
		),

	warning: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => {
				return (
					<div
						className={cn(
							styles.toaster,
							styles.warning,
							currentToast.visible ? styles['fade-in'] : styles['fade-out'],
						)}
					>
						<Icon icon="warning" color="--palette-ui-orange-900" />
						<div className={styles['toaster-text-wrapper']}>
							<span className={cn(styles.title, styles['warning-title'])}>{TOAST_TITLE.warn}</span>
							{message}
						</div>
						<CloseBtn toastId={currentToast.id} />
					</div>
				);
			},

			{
				duration: DURATION_TOAST,
				...args,
			},
		),
};
