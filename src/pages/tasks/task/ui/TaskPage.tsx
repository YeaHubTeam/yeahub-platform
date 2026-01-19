import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useParams } from 'react-router-dom';

import { Loader } from '@/shared/ui/Loader';

import { getProfileId } from '@/entities/profile';
import {
	ExecuteCodeResponse,
	LANGUAGE_IDS,
	useExecuteCodeMutation,
	useGetTaskByIdQuery,
	useTestCodeMutation,
} from '@/entities/task';

import { TaskTabs } from '@/widgets/task/TaskTabs';
import { TaskWorkspace } from '@/widgets/task/TaskWorkspace';

import styles from './TaskPage.module.css';

const TaskPage = () => {
	const { taskId } = useParams<{ taskId: string }>();
	const profileId = useSelector(getProfileId);
	const { data, isLoading } = useGetTaskByIdQuery(taskId || '', { skip: !taskId });
	const [executeCode, { isLoading: isExecuting }] = useExecuteCodeMutation();
	const [testCode, { isLoading: isTesting }] = useTestCodeMutation();

	const [code, setCode] = useState('');
	const [selectedLanguageId, setSelectedLanguageId] = useState<number>(LANGUAGE_IDS.JAVASCRIPT);
	const [output, setOutput] = useState<ExecuteCodeResponse | null>(null);

	useEffect(() => {
		if (data) {
			const jsStructure = data.taskStructures.find(
				(structure) => structure.languageId === LANGUAGE_IDS.JAVASCRIPT,
			);
			if (jsStructure) {
				setCode(jsStructure.solutionTemplate);
			} else {
				setCode('// JavaScript is not supported for this task');
			}
		}
	}, [data]);

	const handleReset = useCallback(() => {
		if (data) {
			const jsStructure = data.taskStructures.find(
				(structure) => structure.languageId === selectedLanguageId,
			);
			if (jsStructure) {
				setCode(jsStructure.solutionTemplate);
			}
		}
	}, [data, selectedLanguageId]);

	const handleRunCode = async () => {
		if (!taskId) return;

		try {
			const response = await executeCode({
				taskId,
				languageId: selectedLanguageId,
				sourceCode: code,
				profileId,
			}).unwrap();

			setOutput(response);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to execute code:', error);
		}
	};

	const handleTestCode = async () => {
		if (!taskId) return;

		try {
			const response = await testCode({
				taskId,
				languageId: selectedLanguageId,
				sourceCode: code,
				profileId,
			}).unwrap();

			setOutput(response);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to test code:', error);
		}
	};

	const supportedLanguages = [{ id: LANGUAGE_IDS.JAVASCRIPT, name: 'JavaScript' }];

	if (isLoading) {
		return <Loader />;
	}

	if (!data) {
		return <div>Not found</div>;
	}

	return (
		<Group orientation="horizontal" className={styles.page}>
			<Panel defaultSize="50%" minSize="30%" maxSize="60%">
				<TaskTabs task={data} />
			</Panel>
			<Separator className={styles['resize-handle']} />
			<Panel minSize="40%">
				<TaskWorkspace
					code={code}
					languageId={selectedLanguageId}
					supportedLanguages={supportedLanguages}
					isExecuting={isExecuting}
					isTesting={isTesting}
					output={output}
					onCodeChange={setCode}
					onLanguageChange={setSelectedLanguageId}
					onReset={handleReset}
					onRun={handleRunCode}
					onSubmit={handleTestCode}
				/>
			</Panel>
		</Group>
	);
};

export default TaskPage;
