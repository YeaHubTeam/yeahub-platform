import { useCurrentProject } from '@/shared/libs';
import { PreviewListItem } from '@/shared/ui/PreviewListItem';

import { getTestQuestionRoute } from '../../lib/getTestQuestionRoute';
import { TestQuestionGradeList } from '../TestQuestionGradeList/TestQuestionGradeList';

interface PreviewTestQuestionsItemProps {
	title: string;
	questionId: number;
	rate?: number;
	complexity?: number;
	frequency?: number;
	imageSrc?: string;
}

export const PreviewTestQuestionsItem = ({
	title,
	questionId,
	rate,
	complexity,
	frequency,
	imageSrc,
}: PreviewTestQuestionsItemProps) => {
	const project = useCurrentProject();
	const questionRoute = getTestQuestionRoute[project](questionId);

	return (
		<PreviewListItem
			to={questionRoute}
			title={title}
			imageSrc={imageSrc}
			Grade={
				<TestQuestionGradeList
					size="small"
					rate={rate}
					complexity={complexity}
					frequency={frequency}
				/>
			}
		/>
	);
};
