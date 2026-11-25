import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { CreateOrEditTaskFormValues } from '@/entities/task';

import styles from './TaskEditFormHeader.module.css';

interface TaskEditFormHeaderProps<T extends CreateOrEditTaskFormValues> {
	onSubmit: (formData: T) => Promise<void>;
	className?: string;
}

export const TaskEditFormHeader = <T extends CreateOrEditTaskFormValues>({
	onSubmit,
	className,
}: TaskEditFormHeaderProps<T>) => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit, formState } = useFormContext<T>();

	return (
		<BackHeader className={className}>
			<FormCancelButton />
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
