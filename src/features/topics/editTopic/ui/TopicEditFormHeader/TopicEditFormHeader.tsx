import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { CreateOrEditTopicFormValues } from '@/entities/topic';

import styles from './TopicEditFormHeader.module.css';

interface TopicEditFormHeaderProps<T extends CreateOrEditTopicFormValues> {
	onSubmit: (formData: T) => Promise<void>;
	className?: string;
}

export const TopicEditFormHeader = <T extends CreateOrEditTopicFormValues>({
	onSubmit,
	className,
}: TopicEditFormHeaderProps<T>) => {
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
