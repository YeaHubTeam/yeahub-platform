import { ReactNode, useMemo } from 'react';
import { useController, Control, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormControl as CustomControl } from 'yeahub-ui-kit';

type ChildrenProps = Omit<ControllerRenderProps<FieldValues, string>, 'ref'>;

interface contrProps {
	name: string;
	control: Control;
	label?: string;
	className?: string;
	children: (field: ChildrenProps, error: boolean) => ReactNode;
}

export const FormControl = ({ children, name, control, label, className }: contrProps) => {
	const {
		field: { ref, ...fieldProps },
		fieldState: { error },
	} = useController({
		name,
		control,
	});

	const errorText = useMemo(() => error?.message?.toString(), [error]);

	return (
		<CustomControl htmlFor={name} label={label} error={errorText} className={className}>
			{children(fieldProps, !!errorText)}
		</CustomControl>
	);
};
