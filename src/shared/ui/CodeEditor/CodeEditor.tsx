import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

import styles from './CodeEditor.module.css';

export const CodeEditor = () => {
	const { t } = useTranslation([i18Namespace.translation]);
	const [code, setCode] = useState('// type your code here');
	const [output, setOutput] = useState('');

	const handleRunCode = () => {
		console.log('Running code:', code);
		// Тут будет логика выполнения кода, пока просто выводим в консоль
		// и можем симулировать какой-то вывод
		setOutput(`Результат выполнения:\n${code}`);
	};

	return (
		<div className={styles.widget}>
			<Text variant="head1">{t(Translation.TASKS_TITLE)}</Text>
			<div className={styles['editor-container']}>
				<MonacoEditor
					height="400px"
					defaultLanguage="javascript"
					defaultValue={code}
					onChange={(value) => setCode(value || '')}
					theme="vs-dark"
				/>
			</div>
			<Button onClick={handleRunCode}>{t(Translation.TASKS_RUN)}</Button>
			<div className={styles['output-container']}>
				<pre>{output}</pre>
			</div>
		</div>
	);
};
