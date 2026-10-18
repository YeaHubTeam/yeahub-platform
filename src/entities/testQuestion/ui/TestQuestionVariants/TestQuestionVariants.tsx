import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { FormField } from '@/shared/ui/FormField';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

import styles from './TestQuestionVariants.module.css';

interface TestQuestionVariantsProps {
	variants: Record<string, string>;
	onVariantsChange: (variants: Record<string, string>) => void;
	successVariants: string[];
	onSuccessVariantsChange: (successVariants: string[]) => void;
}

export const TestQuestionVariants = ({
	variants,
	onVariantsChange,
	successVariants,
	onSuccessVariantsChange,
}: TestQuestionVariantsProps) => {
	const variantKeys = ['a', 'b', 'c', 'd', 'e', 'f'];

	const handleDeleteVariant = (key: string) => {
		const entries = Object.entries(variants);

		if (entries.length === 2) {
			onVariantsChange({
				...variants,
				[key]: '',
			});

			onSuccessVariantsChange(successVariants.filter((variantKey) => variantKey !== key));

			return;
		}

		const filteredEntries = entries.filter(([variantKey]) => variantKey !== key);

		const newVariants = Object.fromEntries(
			filteredEntries.map(([, value], index) => [variantKeys[index], value]),
		);

		const deletedIndex = entries.findIndex(([variantKey]) => variantKey === key);

		const newSuccessVariants = successVariants
			.filter((variantKey) => variantKey !== key)
			.map((variantKey) => {
				const oldIndex = variantKeys.indexOf(variantKey);

				return oldIndex > deletedIndex ? variantKeys[oldIndex - 1] : variantKey;
			});

		onVariantsChange(newVariants);
		onSuccessVariantsChange(newSuccessVariants);
	};

	return (
		<Flex direction="column" gap="24">
			{Object.entries(variants).map(([key, value], index) => (
				<FormField
					key={key}
					label={`Вариант ответа ${index + 1}`}
					description="Добавьте текст ответа"
				>
					<Flex align="center" gap="8">
						<Input
							value={value}
							onChange={(event) =>
								onVariantsChange({
									...variants,
									[key]: event.target.value,
								})
							}
						/>

						<Checkbox
							checked={successVariants.includes(key)}
							onChange={(event) => {
								if (event.target.checked) {
									onSuccessVariantsChange([...successVariants, key]);
								} else {
									onSuccessVariantsChange(successVariants.filter((variant) => variant !== key));
								}
							}}
						/>

						<Text variant="body1">Правильный ответ</Text>

						<Icon
							icon="closeCircle"
							size={20}
							color="red-600"
							onClick={() => handleDeleteVariant(key)}
						/>
					</Flex>
				</FormField>
			))}
			{Object.keys(variants).length < variantKeys.length && (
				<Button
					variant="outline"
					className={styles['add-button']}
					onClick={() => {
						const nextKey = variantKeys[Object.keys(variants).length];

						onVariantsChange({
							...variants,
							[nextKey]: '',
						});
					}}
				>
					Добавить вариант ответа
				</Button>
			)}
		</Flex>
	);
};
