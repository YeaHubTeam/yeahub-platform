import { useTranslation } from 'react-i18next';

import { i18Namespace, Task as TaskTranslations } from '@/shared/config';
import { Stub } from '@/shared/ui/Stub';

type TaskSolutionsProps = {
	solutions?: string[];
};

export const TaskSolutions = ({ solutions }: TaskSolutionsProps) => {
	const { t } = useTranslation(i18Namespace.task);

	if (!solutions || solutions.length === 0) {
		return (
			<Stub
				type="empty"
				title={t(TaskTranslations.SOLUTIONS_TAB_TITLE)}
				subtitle={t(TaskTranslations.SOLUTIONS_TAB_SUBTITLE)}
			/>
		);
	}

	return (
		<div>
			{solutions.map((solution, index) => (
				<pre key={index} style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
					{solution}
				</pre>
			))}
		</div>
	);
};
