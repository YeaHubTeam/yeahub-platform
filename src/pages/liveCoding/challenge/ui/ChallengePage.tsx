import MonacoEditor from '@monaco-editor/react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import {
	LANGUAGE_IDS,
	useExecuteCodeMutation,
	useGetChallengeByIdQuery,
	useTestCodeMutation,
} from '@/entities/challenge';
import { getProfileId } from '@/entities/profile';

import styles from './ChallengePage.module.css';

const ChallengePage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const profileId = useSelector(getProfileId);
	const { data, isLoading } = useGetChallengeByIdQuery(id || '', { skip: !id });
	const [executeCode, { isLoading: isExecuting }] = useExecuteCodeMutation();
	const [testCode, { isLoading: isTesting }] = useTestCodeMutation();

	const [activeTab, setActiveTab] = useState<'description' | 'solutions'>('description');
	const [activeOutputTab, setActiveOutputTab] = useState<'output' | 'tests'>('output');
	const [code, setCode] = useState('');
	const [output, setOutput] = useState('');

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

	const handleRunCode = async () => {
		if (!id) return;

		try {
			const response = await executeCode({
				taskId: id,
				languageId: LANGUAGE_IDS.JAVASCRIPT,
				sourceCode: code,
				profileId,
			}).unwrap();

			setOutput(
				response.compilation_error ||
					response.runtime_output ||
					`Tests passed: ${response.passed_tests}/${response.total_tests}`,
			);
			setActiveOutputTab('output');
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to execute code:', error);
			setOutput('Error executing code');
		}
	};

	const handleTestCode = async () => {
		if (!id) return;

		try {
			const response = await testCode({
				taskId: id,
				languageId: LANGUAGE_IDS.JAVASCRIPT,
				sourceCode: code,
				profileId,
			}).unwrap();

			setOutput(
				response.compilation_error ||
					response.runtime_output ||
					`Tests passed: ${response.passed_tests}/${response.total_tests}`,
			);
			setActiveOutputTab('output');
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to test code:', error);
			setOutput('Error testing code');
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	if (!data) {
		return <div>Not found</div>;
	}

	return (
		<div className={styles.page}>
			<div className={styles['left-panel']}>
				<div className={styles.tabs}>
					<div
						role="button"
						tabIndex={0}
						className={`${styles.tab} ${activeTab === 'description' ? styles['tab-active'] : ''}`}
						onClick={() => setActiveTab('description')}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								setActiveTab('description');
							}
						}}
					>
						<Text variant="body2">Описание</Text>
					</div>
					<div
						role="button"
						tabIndex={0}
						className={`${styles.tab} ${activeTab === 'solutions' ? styles['tab-active'] : ''}`}
						onClick={() => setActiveTab('solutions')}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								setActiveTab('solutions');
							}
						}}
					>
						<Text variant="body2">Мои решения</Text>
					</div>
				</div>

				{activeTab === 'description' && (
					<div className={styles['description-content']}>
						<Text variant="head3">{data.name}</Text>
						<TextHtml html={data.description} className={styles.description} />

						{data.constraints && data.constraints.length > 0 && (
							<div className={styles.constraints}>
								<Text variant="head4" className={styles['constraints-title']}>
									Ограничения:
								</Text>
								<ul>
									{data.constraints.map((constraint, index) => (
										<li key={index} className={styles['constraint-item']}>
											<Text variant="body2">{constraint}</Text>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				)}
			</div>

			<div className={styles['right-panel']}>
				<div className={styles['editor-card']}>
					<div className={styles['editor-header']}>
						<div className={styles.actions}>
							<Button variant="secondary" size="small">
								Java Script
							</Button>
							{/* <Button variant="secondary" size="small" icon="refresh" /> */}
						</div>
						<div className={styles.actions}>
							<Button
								variant="outline"
								size="small"
								// icon="play"
								onClick={handleRunCode}
								disabled={isExecuting}
							>
								Запустить
							</Button>
							<Button variant="primary" size="small" onClick={handleTestCode} disabled={isTesting}>
								Отправить
							</Button>
						</div>
					</div>
					<div className={styles['editor-container']}>
						<MonacoEditor
							height="100%"
							defaultLanguage="javascript"
							value={code}
							onChange={(value) => setCode(value || '')}
							theme="vs-light"
							options={{
								minimap: { enabled: false },
								scrollBeyondLastLine: false,
								fontSize: 14,
							}}
						/>
					</div>
				</div>

				<div className={styles['output-card']}>
					<div className={styles.tabs}>
						<div
							role="button"
							tabIndex={0}
							className={`${styles.tab} ${activeOutputTab === 'output' ? styles['tab-active'] : ''}`}
							onClick={() => setActiveOutputTab('output')}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									setActiveOutputTab('output');
								}
							}}
						>
							<Text variant="body2">Результат кода</Text>
						</div>
						<div
							role="button"
							tabIndex={0}
							className={`${styles.tab} ${activeOutputTab === 'tests' ? styles['tab-active'] : ''}`}
							onClick={() => setActiveOutputTab('tests')}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									setActiveOutputTab('tests');
								}
							}}
						>
							<Text variant="body2">Тест кейсы</Text>
						</div>
					</div>
					<div className={styles.output}>
						{activeOutputTab === 'output' && (
							<pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{output}</pre>
						)}
						{activeOutputTab === 'tests' && <div>Test cases functionality coming soon...</div>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChallengePage;

// const twoSum = function(nums, target) {
// 	const map = new Map();

// 	for (let i = 0; i < nums.length; i++) {
// 			const num = nums[i];
// 			const complement = target - num;

// 			if (map.has(complement)) {
// 					return [map.get(complement), i];
// 			}

// 			map.set(num, i);
// 	}

// 	return [];
// };
