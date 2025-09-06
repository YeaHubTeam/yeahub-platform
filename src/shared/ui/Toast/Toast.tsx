import classNames from 'classnames';
import t, { Toast as ToastType } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { CloseBtn } from './CloseBtn';
import { TOAST_DURATION, toastColor, toastIcon, toastTitle } from './constants';
import styles from './Toast.module.css';
import { ToastVariant } from './types';

interface ToastProps {
	currentToast: ToastType;
	message: JSX.Element | string | null;
	variant: ToastVariant;
}

const Toast = ({ currentToast, message, variant }: ToastProps) => {
	const { t: tI18 } = useTranslation(i18Namespace.translation);

	return (
		<Flex
			gap="16"
			align="center"
			className={classNames(
				styles.toaster,
				styles[variant],
				currentToast.visible ? styles['fade-in'] : styles['fade-out'],
			)}
		>
			<Icon icon={toastIcon[variant]} color={toastColor[variant]} />
			<Flex direction="column">
				<Text variant="body3-strong" color={toastColor[variant]}>
					{tI18(toastTitle[variant])}
				</Text>
				{message}
			</Flex>
			<CloseBtn toastId={currentToast.id} />
		</Flex>
	);
};

export const toast = {
	error: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => <Toast currentToast={currentToast} message={message} variant="error" />,
			{
				duration: TOAST_DURATION,
				...args,
			},
		),
	success: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => <Toast currentToast={currentToast} message={message} variant="success" />,
			{
				duration: TOAST_DURATION,
				...args,
			},
		),

	warning: (message: JSX.Element | string | null, args?: Parameters<typeof t>['1']) =>
		t.custom(
			(currentToast) => <Toast currentToast={currentToast} message={message} variant="warning" />,
			{
				duration: TOAST_DURATION,
				...args,
			},
		),
};
