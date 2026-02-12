import { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Input } from '@/shared/ui/Input';

interface TaskConstraintsFieldProps {
	hasError?: boolean;
}

export const TaskConstraintsField = ({ hasError }: TaskConstraintsFieldProps) => {
	const { t } = useTranslation(i18Namespace.task);
	const { control } = useFormContext();
	const {
		fields: constraints,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'constraints',
	});

	useEffect(() => {
		if (constraints.length === 0) {
			append('');
		}
	}, [constraints.length, append]);

	return (
		<Flex direction="column" gap="8">
			{constraints.map((constraint, index) => (
				<Flex key={constraint.id} gap="8">
					<Controller
						control={control}
						name={`constraints.${index}`}
						render={({ field }) => <Input {...field} error={hasError} />}
					/>
					{constraints.length > 1 && (
						<IconButton size="large" icon={<Icon icon="trash" onClick={() => remove(index)} />} />
					)}
				</Flex>
			))}
			<Button onClick={() => append('')}>{t(Tasks.CONSTRAINTS_ADD_BUTTON)}</Button>
		</Flex>
	);
};
