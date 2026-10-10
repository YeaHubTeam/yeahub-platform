import { useFormContext, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import styles from './FormHeader.module.css';

export interface FormHeaderProps<T extends FieldValues = FieldValues> {
	onSubmit: SubmitHandler<T>;
	isLoading?: boolean;
	className?: string;
}

export const FormHeader = <T extends FieldValues = FieldValues>({
	onSubmit,
	isLoading,
	className,
}: FormHeaderProps<T>) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit, formState } = useFormContext<T>();

	return (
		<BackHeader className={className}>
			<FormCancelButton />
			<Button
				disabled={isLoading || formState.isSubmitting}
				onClick={handleSubmit(onSubmit)}
				className={styles.btn}
			>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
