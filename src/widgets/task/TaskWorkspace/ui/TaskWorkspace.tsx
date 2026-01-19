import { useRef } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import type { PanelImperativeHandle } from 'react-resizable-panels';

import { Card } from '@/shared/ui/Card';

import type { TaskWorkspaceProps } from '../model/types/types';

import { TaskEditor } from './TaskEditor/TaskEditor';
import { TaskOutput } from './TaskOutput/TaskOutput';
import styles from './TaskWorkspace.module.css';

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
			<Panel panelRef={editorPanelRef} defaultSize="100%" minSize="116px">
				<Card
					className={styles['editor-card']}
					classNameContent={styles['editor-card-content']}
					withShadow
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
				</Card>
			</Panel>
			<Separator className={styles['resize-handle']} />
			<Panel minSize="112px">
				<Card
					className={styles['output-card']}
					classNameContent={styles['output-card-content']}
					withShadow
				>
					<TaskOutput result={output} />
				</Card>
			</Panel>
		</Group>
	);
};
