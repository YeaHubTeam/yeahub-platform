import { useTranslation } from 'react-i18next';

import { i18Namespace, Task as TaskTranslations } from '@/shared/config';
import { Stub } from '@/shared/ui/Stub';
import { Text } from '@/shared/ui/Text';

import type { ExecuteCodeResponse } from '@/entities/task';

import styles from './TaskOutputResult.module.css';

type TaskOutputResultProps = {
	result: ExecuteCodeResponse | null;
};

export const TaskOutputResult = ({ result }: TaskOutputResultProps) => {
	const { t } = useTranslation(i18Namespace.task);

	if (!result) {
		return (
			<Stub
				type="empty"
				title={t(TaskTranslations.OUTPUT_RESULT_STUB_TITLE)}
				subtitle={t(TaskTranslations.OUTPUT_RESULT_STUB_SUBTITLE)}
			/>
		);
	}

	return (
		<div className={styles.wrapper}>
			{result.compilation_error && (
				<div className={styles.error}>
					<Text variant="body3-strong" color="red-500">
						{t(TaskTranslations.OUTPUT_RESULT_COMPILATION_ERROR)}:
					</Text>
					<pre className={styles.code}>{result.compilation_error}</pre>
				</div>
			)}

			{result.runtime_output && (
				<div className={styles.output}>
					<Text variant="body3-strong">{t(TaskTranslations.OUTPUT_RESULT_RUNTIME_OUTPUT)}:</Text>
					<pre className={styles.code}>{result.runtime_output}</pre>
				</div>
			)}

			<div className={styles.stats}>
				<Text variant="body3-strong">
					{t(TaskTranslations.OUTPUT_RESULT_TESTS_PASSED)}: {result.passed_tests}/
					{result.total_tests}
				</Text>
				<Text variant="body3">
					{t(TaskTranslations.OUTPUT_RESULT_SUCCESS_RATE)}: {result.success_rate.toFixed(2)}%
				</Text>
				<Text variant="body3">
					{t(TaskTranslations.OUTPUT_RESULT_EXECUTION_TIME)}:{' '}
					{result.total_execution_time.toFixed(2)} мс
				</Text>
				<Text variant="body3">
					{t(TaskTranslations.OUTPUT_RESULT_MEMORY_USAGE)}: {result.average_memory_usage.toFixed(2)}{' '}
					KB
				</Text>
			</div>
		</div>
	);
};
