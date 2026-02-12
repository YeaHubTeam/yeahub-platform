import { useRef } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import type { PanelImperativeHandle } from 'react-resizable-panels';

import { Card } from '@/shared/ui/Card';

import { ProgrammingLanguage } from '@/entities/programmingLanguage';
import type { ExecuteCodeResponse } from '@/entities/task';

import { TaskEditor } from './TaskEditor/TaskEditor';
import { TaskOutput } from './TaskOutput/TaskOutput';
import styles from './TaskWorkspace.module.css';

interface TaskWorkspaceProps {
	code: string;
	languageId: number;
	supportedLanguages: ProgrammingLanguage[];
	isExecuting: boolean;
	isTesting: boolean;
	output: ExecuteCodeResponse | null;
	onCodeChange: (code: string) => void;
	onLanguageChange: (languageId: number) => void;
	onReset: () => void;
	onRun: () => void;
	onSubmit: () => void;
}

export const TaskWorkspace = ({
	code,
	languageId,
	supportedLanguages,
	isExecuting,
	isTesting,
	output,
	onCodeChange,
	onLanguageChange,
	onReset,
	onRun,
	onSubmit,
}: TaskWorkspaceProps) => {
	const editorPanelRef = useRef<PanelImperativeHandle>(null);

	const handleRun = async () => {
		await onRun();
		editorPanelRef.current?.resize(100);
	};

	const handleSubmit = async () => {
		await onSubmit();
		editorPanelRef.current?.resize(100);
	};

	return (
		<Group orientation="vertical" className={styles.workspace}>
			<Panel
				panelRef={editorPanelRef}
				defaultSize="100%"
				minSize="116px"
				style={{ padding: '20px' }}
			>
				<TaskEditor
					code={code}
					languageId={languageId}
					supportedLanguages={supportedLanguages}
					isExecuting={isExecuting}
					isTesting={isTesting}
					onCodeChange={onCodeChange}
					onLanguageChange={onLanguageChange}
					onReset={onReset}
					onRun={handleRun}
					onSubmit={handleSubmit}
				/>
			</Panel>
			<Separator className={styles['resize-handle']} />
			<Panel minSize="160px" style={{ padding: '20px' }}>
				<Card
					className={styles['output-card']}
					classNameContent={styles['output-card-content']}
					withOutsideShadow
				>
					<TaskOutput result={output} />
				</Card>
			</Panel>
		</Group>
	);
};
