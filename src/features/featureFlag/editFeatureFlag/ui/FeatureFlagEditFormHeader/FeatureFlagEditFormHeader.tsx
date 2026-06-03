import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Translation, i18Namespace } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { VariantType } from '@/shared/ui/IconButton';

import { CreateOrEditFeatureFlagFormValues } from '@/entities/featureFlag';

import { FeatureFlagEditFormCancelModal } from '../FeatureFlagEditFormCancelModal/FeatureFlagEditFormCancelModal';

import styles from './FeatureFlagEditFormHeader.module.css';

interface FeatureFlagEditFormHeaderProps<T extends CreateOrEditFeatureFlagFormValues> {
	onSubmit: (formData: T) => Promise<void>;
	className?: string;
	btnVariant?: VariantType;
}

export const FeatureFlagEditFormHeader = <T extends CreateOrEditFeatureFlagFormValues>({
	onSubmit,
	className,
	btnVariant = 'destructive-secondary',
}: FeatureFlagEditFormHeaderProps<T>) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isOpen, onClose, onOpen } = useModal();

	const { handleSubmit, reset, formState } = useFormContext<T>();

	const { isDirty } = formState;

	const onResetFormValues = () => {
		reset();
		onClose();
	};

	return (
		<BackHeader className={className}>
			{isDirty && (
				<Button onClick={onOpen} variant={btnVariant} className={styles.btn}>
					{t(Translation.CANCEL)}
				</Button>
			)}
			<Button
				disabled={formState.isSubmitting}
				onClick={handleSubmit(onSubmit)}
				className={styles.btn}
			>
				{t(Translation.SAVE)}
			</Button>
			<FeatureFlagEditFormCancelModal
				isOpen={isOpen}
				onClose={onClose}
				onResetFormValues={onResetFormValues}
			/>
		</BackHeader>
	);
};
