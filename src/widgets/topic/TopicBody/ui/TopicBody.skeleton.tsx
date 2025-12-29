import { CardSkeleton } from '@/shared/ui/Card';
import { TextHtmlSkeleton } from '@/shared/ui/TextHtml';

export const TopicBodySkeleton = () => {
	return (
		<CardSkeleton title="title" withOutsideShadow>
			<TextHtmlSkeleton />
		</CardSkeleton>
	);
};
