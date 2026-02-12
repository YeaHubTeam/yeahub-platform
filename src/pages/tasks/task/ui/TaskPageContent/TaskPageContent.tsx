import { useCallback, useMemo, useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';

import { useAppSelector } from '@/shared/libs';

import { getProfileId } from '@/entities/profile';
import { ProgrammingLanguage } from '@/entities/programmingLanguage';
import {
	ExecuteCodeResponse,
	Task,
	useExecuteCodeMutation,
	useTestCodeMutation,
} from '@/entities/task';

import { TaskTabs } from '@/widgets/task/TaskTabs';
import { TaskWorkspace } from '@/widgets/task/TaskWorkspace';

import styles from './TaskPageContent.module.css';

interface TaskPageContentProps {
	task: Task;
}

export const TaskPageContent = ({ task }: TaskPageContentProps) => {
	const profileId = useAppSelector(getProfileId);

	const [executeCode, { isLoading: isExecuting }] = useExecuteCodeMutation();
	const [testCode, { isLoading: isTesting }] = useTestCodeMutation();

	const [code, setCode] = useState<string>(task.taskStructures[0].solutionStub);
	const [output, setOutput] = useState<ExecuteCodeResponse | null>(null);
	const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
		task.supportedLanguages[0],
	);

	const taskStructure = useMemo(() => {
		return task.taskStructures.find(({ languageId }) => languageId === selectedLanguage.id);
	}, [selectedLanguage, task]);

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
		<Group orientation="horizontal" className={styles.page}>
			<Panel defaultSize="50%" minSize="30%" maxSize="60%" style={{ padding: '20px' }}>
				<TaskTabs task={task} />
			</Panel>
			<Separator className={styles['resize-handle']} />
			<Panel minSize="40%">
				<TaskWorkspace
					code={code}
					languageId={selectedLanguage.id}
					supportedLanguages={task.supportedLanguages}
					isExecuting={isExecuting}
					isTesting={isTesting}
					output={output}
					onCodeChange={setCode}
					onLanguageChange={onChangeSelectedLanguage}
					onReset={handleReset}
					onRun={handleRunCode}
					onSubmit={handleExecuteCode}
				/>
			</Panel>
		</Group>
	);
};
