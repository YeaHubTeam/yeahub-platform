import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';

import styles from './FormCancelButton.module.css';

type FormCancelButtonProps = Pick<ComponentProps<typeof Button>, 'className' | 'disabled' | 'size'>;

export const FormCancelButton = ({
	className,
	disabled,
	size = 'large',
}: FormCancelButtonProps) => {
	const { isOpen, onOpen, onClose } = useModal();
	const {
		reset,
		formState: { isDirty, isSubmitting },
	} = useFormContext();
	const { t } = useTranslation(i18Namespace.translation);

	const handleConfirmReset = () => {
		reset();
		onClose();
	};

	return (
		<>
			{isDirty && (
				<Button
					type="button"
					className={classNames(styles.button, className)}
					disabled={disabled || isSubmitting}
					size={size}
					variant="destructive-secondary"
					onClick={onOpen}
				>
					{t(Translation.RESET)}
				</Button>
			)}

			{isOpen && (
				<BlockerDialog
					isOpen={isOpen}
					onClose={onClose}
					onOk={handleConfirmReset}
					onCancel={onClose}
					message={Translation.MODAL_CANCEL_CHANGES}
				/>
			)}
		</>
	);
};
