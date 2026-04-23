import { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import PlusSvg from '@/shared/assets/icons/plus1.svg';
import { i18Namespace, Questions, Translation } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Input } from '@/shared/ui/Input';

import { SpecializationSelect } from '@/entities/specialization/@x/question';

import styles from './QuestionMultipleForm.module.css';

export const QuestionMultipleForm = () => {
	const { t } = useTranslation([i18Namespace.questions, i18Namespace.translation]);

	const { control } = useFormContext();
	const {
		fields: questions,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'questions',
	});

	useEffect(() => {
		if (questions.length === 0) {
			append('');
		}
	}, [questions.length, append]);

	return (
		<Flex direction="column" gap="40">
			<FormField
				label={t(Questions.SPECIALIZATION_TITLE)}
				description={t(Questions.SPECIALIZATION_LABEL)}
			>
				<FormControl name="specializationId" control={control}>
					{({ onChange, value }) => (
						<div>
							<SpecializationSelect
								onChange={(val) => {
									const numVal = Array.isArray(val) ? val[0] : val;
									onChange(numVal);
								}}
								value={value ?? 0}
							/>
						</div>
					)}
				</FormControl>
			</FormField>

			<FormField
				label={t(Translation.QUESTIONS_ADD, { ns: i18Namespace.translation })}
				direction="column"
			>
				{questions.map((question, index) => (
					<Flex gap="8" align="start" key={question.id}>
						<Controller
							control={control}
							name={`questions.${index}`}
							render={({ field, fieldState }) => (
								<Input
									{...field}
									error={Boolean(fieldState.error)}
									placeholder={t(Questions.TITLE_PLACEHOLDER)}
									size="L"
									className={styles.input}
								/>
							)}
						/>
						{questions.length > 1 && (
							<IconButton size="large" icon={<Icon icon="trash" onClick={() => remove(index)} />} />
						)}
					</Flex>
				))}
			</FormField>

			<Button variant="outline" size="large" onClick={() => append('')}>
				{t(Translation.CREATE, { ns: i18Namespace.translation })}
				<PlusSvg />
			</Button>
		</Flex>
	);
};
