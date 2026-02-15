import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Group, Panel, Separator } from 'react-resizable-panels';

import ChatIcon from '@/shared/assets/icons/chat.svg';
import { i18Namespace, Tasks, Translation } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

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
	const { t } = useTranslation([i18Namespace.translation, i18Namespace.task]);
	const [executeCode, { isLoading: isExecuting }] = useExecuteCodeMutation();
	const [testCode, { isLoading: isTesting }] = useTestCodeMutation();

	const [code, setCode] = useState<string>(task.taskStructures[0].solutionStub);
	const [output, setOutput] = useState<ExecuteCodeResponse | null>(null);
	const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
		task.supportedLanguages[0],
	);

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

	const openSupportTab = () => window.open('https://t.me/yeahub_support', '_blank');

	const handleReset = useCallback(() => {
		setCode(taskStructure?.solutionStub || '');
	}, [taskStructure]);

	return (
		<Flex direction="column" gap="20">
			<Card>
				<Flex align="center" gap="20" justify="between">
					<Text variant="body5-strong">
						{t(Tasks.BANNER_BETA_TITLE, { ns: i18Namespace.task })}
					</Text>
					<Button
						className={styles.support}
						size="large"
						preffix={<ChatIcon />}
						onClick={openSupportTab}
					>
						{t(Translation.SUPPORT)}
					</Button>
				</Flex>
			</Card>
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
		</Flex>
	);
};
