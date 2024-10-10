import { ReactNode, useMemo } from 'react';
import { Control, ControllerRenderProps, FieldValues, useController } from 'react-hook-form';
import { FormControl as CustomControl } from 'yeahub-ui-kit';

import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

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

	const { t } = useI18nHelpers();

	const errorText = useMemo(() => error?.message && t(error?.message), [error, t]);

	return (
		<CustomControl htmlFor={name} label={label} error={errorText} className={className}>
			{children(fieldProps, !!errorText)}
		</CustomControl>
	);
};
