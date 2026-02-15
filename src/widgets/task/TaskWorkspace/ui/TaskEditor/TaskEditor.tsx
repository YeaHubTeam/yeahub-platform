import MonacoEditor from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { ProgrammingLanguage, ProgrammingLanguageSelect } from '@/entities/programmingLanguage';

import styles from './TaskEditor.module.css';

type TaskEditorProps = {
	code: string;
	languageId: number;
	supportedLanguages: ProgrammingLanguage[];
	isExecuting: boolean;
	isTesting: boolean;
	onCodeChange: (code: string) => void;
	onLanguageChange: (languageId: number) => void;
	onReset: () => void;
	onRun: () => void;
	onSubmit: () => void;
};

export const TaskEditor = ({
	code,
	languageId,
	supportedLanguages,
	isExecuting,
	isTesting,
	onCodeChange,
	onLanguageChange,
	onReset,
	onRun,
	onSubmit,
}: TaskEditorProps) => {
	const { t } = useTranslation(i18Namespace.task);
	const currentLanguage = supportedLanguages.find((lang) => lang.id === languageId);

	return (
		<Flex direction="column" gap="16" className={styles.wrapper}>
			<Card size="small" withOutsideShadow className={styles.header}>
				<Flex align="center" justify="between" gap="24" wrap="wrap">
					<Flex gap="12" align="center">
						<ProgrammingLanguageSelect
							width={200}
							value={String(languageId)}
							onChange={(value) => {
								onLanguageChange(Number(value));
							}}
							supportedLanguages={supportedLanguages}
						/>
						<IconButton size="large" icon={<Icon icon="refresh" />} onClick={onReset} />
					</Flex>
					<Flex gap="12" align="center">
						<Button variant="outline" size="large" onClick={onRun} disabled={isExecuting}>
							{t(Tasks.EDITOR_ACTIONS_RUN)}
						</Button>
						<Button variant="primary" size="large" onClick={onSubmit} disabled={isTesting}>
							{t(Tasks.EDITOR_ACTIONS_SUBMIT)}
						</Button>
					</Flex>
				</Flex>
			</Card>

			<Card size="small" withOutsideShadow className={styles.block} classNameContent={styles.block}>
				<div className={styles.editor}>
					<MonacoEditor
						defaultLanguage={currentLanguage?.name.toLowerCase() || 'javascript'}
						value={code}
						onChange={(value) => onCodeChange(value || '')}
						theme="vs-light"
						options={{
							minimap: { enabled: false },
							scrollBeyondLastLine: false,
							fontSize: 14,
						}}
					/>
				</div>
			</Card>
		</Flex>
	);
};
