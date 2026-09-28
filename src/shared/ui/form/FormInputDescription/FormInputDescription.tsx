import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { TextArea } from '@/shared/ui/TextArea';

import styles from './FormInputDescription.module.css';

export interface FormInputDescriptionProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	description?: string;
	placeholder?: string;
	limit?: number;
	className?: string;
	direction?: 'row' | 'column';
}

export const FormInputDescription = <T extends FieldValues>({
	name,
	label,
	description,
	placeholder,
	limit = 1000,
	className,
	direction,
}: FormInputDescriptionProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<FormField label={label} description={description} direction={direction}>
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
