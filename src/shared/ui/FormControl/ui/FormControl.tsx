import { ReactNode, useMemo } from 'react';
import { useController, Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormControl as CustomControl } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

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

	const { t } = useI18nHelpers(i18Namespace.validation);

	const errorText = useMemo(() => error?.message && t(error?.message), [error, t]);

	return (
		<CustomControl htmlFor={name} label={label} error={errorText} className={className}>
			{children(fieldProps, !!errorText)}
		</CustomControl>
	);
};
