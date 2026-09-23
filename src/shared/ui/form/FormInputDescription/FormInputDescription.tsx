import { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { TextArea } from '@/shared/ui/TextArea';

import styles from './FormInputDescription.module.css';

export interface FormInputDescriptionProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	description?: string;
	placeholder?: string;
	limit?: number;
	className?: string;
}

export const FormInputDescription = <T extends FieldValues>({
	name,
	control,
	label,
	description,
	placeholder,
	limit = 1000,
	className,
}: FormInputDescriptionProps<T>) => {
	return (
		<FormField label={label} description={description} direction="column">
			<FormControl name={name} control={control}>
				{(field, hasError) => (
					<TextArea
						{...field}
						id={name}
						className={className || styles.description}
						state={hasError ? 'error' : 'default'}
						placeholder={placeholder}
						limit={limit}
					/>
				)}
			</FormControl>
		</FormField>
	);
};
