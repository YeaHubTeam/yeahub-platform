import React, { useCallback, useState } from 'react';

import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getProfileId } from '@/entities/profile';
import { ProgrammingLanguage } from '@/entities/programmingLanguage';
import {
	ExecuteCodeResponse,
	Task,
	useExecuteCodeMutation,
	useTestCodeMutation,
} from '@/entities/task';

import { TaskEditor } from '@/widgets/task/TaskEditor';
import { TaskTabs } from '@/widgets/task/TaskTabs';

import styles from './TaskPageContent.module.css';

interface TaskPageContentProps {
	task: Task;
}

export const TaskPageContent = ({ task }: TaskPageContentProps) => {
	const profileId = useAppSelector(getProfileId);
	const [executeCode, { isLoading: isExecuting }] = useExecuteCodeMutation();
	const [testCode, { isLoading: isTesting }] = useTestCodeMutation();
	const { isMobile, isTablet } = useScreenSize();

	const [code, setCode] = useState<string>(task.taskStructures[0].solutionStub);
	const [output, setOutput] = useState<ExecuteCodeResponse | null>(null);
	const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
		task.supportedLanguages[0],
	);
	console.log(output);
	const taskStructure = task.taskStructures.find(
		({ languageId }) => languageId === selectedLanguage.id,
	);

	const onChangeSelectedLanguage = (languageId: number) => {
		const selectedLanguage =
			task.supportedLanguages.find(({ id }) => id === languageId) || task.supportedLanguages[0];
		setSelectedLanguage(selectedLanguage);
		setCode(
			(
				task.taskStructures.find((taskStructure) => taskStructure.languageId === languageId) ||
				task.taskStructures[0]
			).solutionStub,
		);
	};

	const handleExecuteCode = async () => {
		try {
			const response = await executeCode({
				taskId: task.id,
				languageId: selectedLanguage.id,
				sourceCode: code,
				profileId,
			}).unwrap();

			setOutput(response);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to execute code:', error);
		}
	};

	const handleRunCode = async () => {
		try {
			const response = await testCode({
				taskId: task.id,
				languageId: selectedLanguage.id,
				sourceCode: code,
				profileId,
			}).unwrap();

			setOutput(response);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to test code:', error);
		}
	};

	const handleReset = useCallback(() => {
		setCode(taskStructure?.solutionStub || '');
	}, [taskStructure]);

	return (
		<Card withOutsideShadow className={styles.page} classNameContent={styles.content}>
			<Flex gap="20" direction={isMobile || isTablet ? 'column' : 'row'} maxHeight>
				<TaskTabs task={task} result={output} />
				<TaskEditor
					code={code}
					languageId={selectedLanguage.id}
					supportedLanguages={task.supportedLanguages}
					isExecuting={isExecuting}
					isTesting={isTesting}
					onCodeChange={setCode}
					onLanguageChange={onChangeSelectedLanguage}
					onReset={handleReset}
					onRun={handleRunCode}
					onSubmit={handleExecuteCode}
				/>
			</Flex>
		</Card>
	);
};
