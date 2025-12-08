import { HTMLProps, ReactNode, useMemo } from 'react';
import { useController, Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

type ChildrenProps = Omit<ControllerRenderProps<FieldValues, string>, 'ref'>;

export interface FormControlProps<T extends FieldValues> {
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
	...otherProps
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

	const content = (
		<>
			{children(fieldProps, !!errorText)}
			{errorText && (
				<Text variant="body1" color="red-700">
					{errorText}
				</Text>
			)}
		</>
	);

	if (label) {
		return (
			<label htmlFor={name} className={className} {...otherProps}>
				<Flex direction="column" gap="8">
					<Text variant="body2" color="black-700">
						{label}
					</Text>
					{content}
				</Flex>
			</label>
		);
	}

	return (
		<div className={className} {...(otherProps as HTMLProps<HTMLDivElement>)}>
			{content}
		</div>
	);
};

FormControl.displayName = 'FormControl';
