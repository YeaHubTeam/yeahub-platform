import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import {
	CreateOrEditOrViewResourceFormValues,
	ResourceRequestFormValues,
} from '@/entities/resource';

import styles from './ResourceEditFormHeader.module.css';

interface ResourceEditFormHeaderProps<
	T extends CreateOrEditOrViewResourceFormValues | ResourceRequestFormValues,
> {
	onSubmit: (formData: T) => Promise<void>;
	className?: string;
}

export const ResourceEditFormHeader = <
	T extends CreateOrEditOrViewResourceFormValues | ResourceRequestFormValues,
>({
	onSubmit,
	className,
}: ResourceEditFormHeaderProps<T>) => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit, formState } = useFormContext<T>();

	return (
		<BackHeader className={className}>
			<FormCancelButton className={styles.btn} />
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
