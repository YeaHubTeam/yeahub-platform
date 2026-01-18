import MonacoEditor from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Challenge as ChallengeTranslations } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import styles from './ChallengeEditor.module.css';

type ChallengeEditorProps = {
	code: string;
	languageId: number;
	supportedLanguages: { id: number; name: string }[];
	isExecuting: boolean;
	isTesting: boolean;
	onCodeChange: (code: string) => void;
	onLanguageChange: (languageId: number) => void;
	onReset: () => void;
	onRun: () => void;
	onSubmit: () => void;
};

export const ChallengeEditor = ({
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
}: ChallengeEditorProps) => {
	const { t } = useTranslation(i18Namespace.challenge);
	const currentLanguage = supportedLanguages.find((lang) => lang.id === languageId);

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.actions}>
					<select
						value={languageId}
						onChange={(e) => onLanguageChange(Number(e.target.value))}
						className={styles.select}
					>
						{supportedLanguages.map((lang) => (
							<option key={lang.id} value={lang.id}>
								{lang.name}
							</option>
						))}
					</select>
					<Button variant="secondary" size="small" onClick={onReset}>
						<Icon icon="refresh" />
					</Button>
				</div>
				<div className={styles.actions}>
					<Button variant="outline" size="small" onClick={onRun} disabled={isExecuting}>
						{t(ChallengeTranslations.EDITOR_ACTIONS_RUN)}
					</Button>
					<Button variant="primary" size="small" onClick={onSubmit} disabled={isTesting}>
						{t(ChallengeTranslations.EDITOR_ACTIONS_SUBMIT)}
					</Button>
				</div>
			</div>
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
		</div>
	);
};
