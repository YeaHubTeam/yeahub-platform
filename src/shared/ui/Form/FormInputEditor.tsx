import { FieldValues } from 'react-hook-form';

import { FormControl } from '../FormControl';
import { FormControlProps } from '../FormControl/FormControl';
import { FormField } from '../FormField';
import { FormFieldProps } from '../FormField/FormField';
import { TextEditor } from '../TextEditor';
import { TextEditorProps } from '../TextEditor/TextEditor';

interface FormInputEditorProps<T extends FieldValues> {
	fieldProps: Omit<FormFieldProps, 'children'>;
	controlProps: Omit<FormControlProps<T>, 'children'>;
	textEditorProps: TextEditorProps;
	wrapperDivClassName?: string;
	onChange?: boolean;
	onBlur?: boolean;
}

export const FormInputEditor = <T extends FieldValues>({
	fieldProps,
	controlProps,
	textEditorProps,
	wrapperDivClassName,
	onChange,
	onBlur,
}: FormInputEditorProps<T>) => {
	const editor = (
		<FormControl name={controlProps.name} control={controlProps.control}>
			{(field) => (
				<TextEditor
					{...textEditorProps}
					{...field}
					data={field.value}
					onChange={onChange ? (value) => field.onChange(value) : undefined}
					onBlur={onBlur ? field.onBlur : undefined}
				/>
			)}
		</FormControl>
	);

	return (
		<FormField
			label={fieldProps.label}
			description={fieldProps.description}
			direction={fieldProps.direction}
		>
			{wrapperDivClassName ? <div className={wrapperDivClassName}>{editor}</div> : editor}
		</FormField>
	);
};
