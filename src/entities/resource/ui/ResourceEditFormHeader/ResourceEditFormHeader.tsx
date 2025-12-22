import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { VariantType } from '@/shared/ui/IconButton';

import { CreateOrEditOrViewResourceFormValues } from '../../model/types/resource';
import { ResourceRequestFormValues } from '../../model/types/resourceRequest';

import styles from './ResourceEditFormHeader.module.css';

interface ResourceEditFormHeaderProps<
	T extends CreateOrEditOrViewResourceFormValues | ResourceRequestFormValues,
> {
	onSubmit: (formData: T) => Promise<void>;
	className?: string;
	btnVariant?: VariantType;
}

export const ResourceEditFormHeader = <
	T extends CreateOrEditOrViewResourceFormValues | ResourceRequestFormValues,
>({
	onSubmit,
	className,
	btnVariant = 'secondary',
}: ResourceEditFormHeaderProps<T>) => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit, reset, formState } = useFormContext<T>();

	const onResetFormValues = () => {
		reset();
	};

	return (
		<BackHeader className={className}>
			<Button onClick={onResetFormValues} variant={btnVariant} className={styles.btn}>
				{t(Translation.CANCEL)}
			</Button>
			<Button
				disabled={formState.isSubmitting}
				onClick={handleSubmit(onSubmit)}
				className={styles.btn}
			>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
