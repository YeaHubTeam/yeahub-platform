import { HTMLProps, ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';

import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { FormControlProps } from './FormControl';

export const FormControlSkeleton = <T extends FieldValues>({
	label,
	children,
	className,
	...otherProps
}: Partial<Omit<FormControlProps<T>, 'children'>> & { children: ReactNode }) => {
	const content = <>{children}</>;

	if (label) {
		return (
			<label className={className} {...otherProps}>
				<Flex direction="column" gap="8">
					<TextSkeleton variant="body2" width={200} />
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
