import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
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
				title={t(Tasks.OUTPUT_RESULT_STUB_TITLE)}
				subtitle={t(Tasks.OUTPUT_RESULT_STUB_SUBTITLE)}
			/>
		);
	}

	return (
		<Flex direction="column" gap="16">
			{/*{result.compilation_error && (*/}
			{/*	<div className={styles.error}>*/}
			{/*		<Text variant="body3-strong" color="red-500">*/}
			{/*			{t(Tasks.OUTPUT_RESULT_COMPILATION_ERROR)}:*/}
			{/*		</Text>*/}
			{/*		<pre className={styles.code}>{result.compilation_error}</pre>*/}
			{/*	</div>*/}
			{/*)}*/}

			{/*{result.runtime_output && (*/}
			{/*	<div className={styles.output}>*/}
			{/*		<Text variant="body3-strong">{t(Tasks.OUTPUT_RESULT_RUNTIME_OUTPUT)}:</Text>*/}
			{/*		<pre className={styles.code}>{result.runtime_output}</pre>*/}
			{/*	</div>*/}
			{/*)}*/}
			<Text
				variant="body5-accent"
				color={result.overall_status === 'SUCCESS' ? 'green-800' : 'red-700'}
			>
				{t(
					result.overall_status === 'SUCCESS'
						? Tasks.TABLE_STATUS_SOLVED
						: Tasks.TABLE_STATUS_NOT_SOLVED,
				)}
			</Text>
			<Flex direction="column" gap="8" className={styles.stats}>
				{/*<Text variant="body3-strong">*/}
				{/*	{t(Tasks.OUTPUT_RESULT_TESTS_PASSED)}: {result.passed_tests}/{result.total_tests}*/}
				{/*</Text>*/}
				{/*<Text variant="body3">*/}
				{/*	{t(Tasks.OUTPUT_RESULT_SUCCESS_RATE)}: {result.success_rate.toFixed(2)}%*/}
				{/*</Text>*/}
				<Text variant="body3">
					{t(Tasks.OUTPUT_RESULT_EXECUTION_TIME)}:{' '}
					{t(Tasks.TIME_LIMIT_VALUE, { count: result.total_execution_time || 0 })}
				</Text>
				<Text variant="body3">
					{t(Tasks.OUTPUT_RESULT_MEMORY_USAGE)}:{' '}
					{t(Tasks.MEMORY_LIMIT_VALUE, { count: result.average_memory_usage || 0 })}
				</Text>
			</Flex>
		</Flex>
	);
};
