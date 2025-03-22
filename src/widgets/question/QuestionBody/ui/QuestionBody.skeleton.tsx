import { CardSkeleton } from '@/shared/ui/Card';
import { TextHtmlSkeleton } from '@/shared/ui/TextHtml';

export const QuestionBodySkeleton = () => {
	return (
		<>
			<CardSkeleton title="title" withOutsideShadow>
				<TextHtmlSkeleton />
			</CardSkeleton>
			<CardSkeleton title="title" withOutsideShadow>
				<TextHtmlSkeleton />
			</CardSkeleton>
		</>
	);
};
