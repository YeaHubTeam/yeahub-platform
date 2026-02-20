import MonacoEditor from '@monaco-editor/react';
import { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormField } from '@/shared/ui/FormField';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Switch } from '@/shared/ui/Switch';

import {
	ProgrammingLanguageCode,
	ProgrammingLanguageSelect,
	useGetLanguagesQuery,
} from '@/entities/programmingLanguage/@x/task';
import { CreateOrEditTaskFormValues } from '@/entities/task';

import styles from './TaskStructuresField.module.css';

type LanguageOptions = Record<number, ProgrammingLanguageCode>;
type LanguagePreloadedCode = Record<number, string>;

export const TaskStructuresField = () => {
	const { t } = useTranslation(i18Namespace.task);
	const { control, watch, setValue } = useFormContext<CreateOrEditTaskFormValues>();
	const {
		fields: taskStructures,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'taskStructures',
	});

	const { data } = useGetLanguagesQuery();

	const taskStructuresValues = watch('taskStructures');

	const languages =
		data?.reduce((result, language) => {
			result[language.id] = language.monacoLangId;
			return result;
		}, {} as LanguageOptions) || {};

	const languagePreloadedCodes =
		data?.reduce((result, language) => {
			result[language.id] = language.defaultPreloadedCode;
			return result;
		}, {} as LanguagePreloadedCode) || ({} as LanguagePreloadedCode);

	const selectedLanguages = taskStructuresValues.map(({ languageId }) => Number(languageId));

	useEffect(() => {
		if (data) {
			taskStructures.forEach((taskStructure, index) => {
				if (taskStructure.preloadedCode !== languagePreloadedCodes[taskStructure.languageId]) {
					setValue(
						`taskStructures.${index}.preloadedCode`,
						languagePreloadedCodes[taskStructure.languageId],
					);
				}
			});
		}
	}, [data]);

	return (
		<Flex direction="column" gap="16">
			{taskStructures.map((structure, index) => (
				<Card key={structure.id} withOutsideShadow withBorder>
					<Flex gap="16" direction="column">
						<FormField label={t(Tasks.TASK_STRUCTURES_ACTIVE)}>
							<Controller
								control={control}
								name={`taskStructures.${index}.isActive`}
								render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
							/>
						</FormField>
						<FormField label={t(Tasks.TASK_STRUCTURES_LANGUAGE)}>
							<Controller
								control={control}
								name={`taskStructures.${index}.languageId`}
								render={({ field }) => (
									<ProgrammingLanguageSelect
										selectedLanguageIds={selectedLanguages}
										value={String(field.value)}
										onChange={(value) => {
											field.onChange(value);
											setValue(
												`taskStructures.${index}.preloadedCode`,
												languagePreloadedCodes[Number(Array.isArray(value) ? value[0] : value)],
											);
										}}
									/>
								)}
							/>
						</FormField>
						<FormField label={t(Tasks.TASK_STRUCTURES_SOLUTION_STUB)} direction="column">
							<Controller
								control={control}
								name={`taskStructures.${index}.solutionStub`}
								render={({ field }) => (
									<MonacoEditor
										className={styles.editor}
										defaultLanguage={languages[taskStructuresValues[index].languageId]}
										value={field.value}
										onChange={field.onChange}
										theme="vs-light"
										options={{
											minimap: { enabled: false },
											scrollBeyondLastLine: false,
											fontSize: 14,
											readOnly: !languages[taskStructuresValues[index].languageId],
										}}
									/>
								)}
							/>
						</FormField>
						<FormField label={t(Tasks.TASK_STRUCTURES_TEXT_FIXTURE)} direction="column">
							<Controller
								control={control}
								name={`taskStructures.${index}.testFixture`}
								render={({ field }) => (
									<MonacoEditor
										className={styles.editor}
										defaultLanguage={languages[taskStructuresValues[index].languageId]}
										value={field.value}
										onChange={field.onChange}
										theme="vs-light"
										options={{
											minimap: { enabled: false },
											scrollBeyondLastLine: false,
											fontSize: 14,
											readOnly: !languages[taskStructuresValues[index].languageId],
										}}
									/>
								)}
							/>
						</FormField>
						<FormField label={t(Tasks.TASK_STRUCTURES_PRELOADED_CODE)} direction="column">
							<Controller
								control={control}
								name={`taskStructures.${index}.preloadedCode`}
								render={({ field }) => (
									<MonacoEditor
										className={styles.editor}
										defaultLanguage={languages[taskStructuresValues[index].languageId]}
										value={field.value || ''}
										onChange={field.onChange}
										theme="vs-light"
										options={{
											minimap: { enabled: false },
											scrollBeyondLastLine: false,
											fontSize: 14,
											readOnly: !languages[taskStructuresValues[index].languageId],
										}}
									/>
								)}
							/>
						</FormField>
						{taskStructures.length > 1 && (
							<IconButton
								className={styles.delete}
								icon={<Icon icon="trash" onClick={() => remove(index)} />}
							/>
						)}
					</Flex>
				</Card>
			))}
			<Button
				className={styles.add}
				onClick={() => append({ languageId: 0, solutionStub: '', testFixture: '', isActive: true })}
			>
				{t(Tasks.TASK_STRUCTURES_ADD_BUTTON)}
			</Button>
		</Flex>
	);
};
