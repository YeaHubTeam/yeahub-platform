import { ReactNode, useMemo } from 'react';
import { useController, Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControl as CustomControl } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';

type ChildrenProps = Omit<ControllerRenderProps<FieldValues, string>, 'ref'>;

interface FormControlProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	className?: string;
	children: (field: ChildrenProps, error: boolean) => ReactNode;
}

export const FormControl = <T extends FieldValues>({
	children,
	name,
	control,
	label,
	className,
}: FormControlProps<T>) => {
	const {
		field: { ref, ...fieldProps },
		fieldState: { error },
	} = useController({
		name,
		control,
	});

	const { t } = useTranslation(i18Namespace.translation);

	const errorText = useMemo(() => error?.message, [error, t]);
	// const errorText = useMemo(() => error?.message && t(error?.message, errorOptions), [error, t]);

	return (
		<CustomControl htmlFor={name} label={label} error={errorText} className={className}>
			{children(fieldProps, !!errorText)}
		</CustomControl>
	);
};
