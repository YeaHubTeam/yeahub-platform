import { Card } from '@/shared/ui/Card';

import { CollectionNavigationButtons } from '@/features/collections/navigateCollection';
interface CollectionNavigationProps {
	onMovePrev: () => void;
	onMoveNext: () => void;
	isDisabled: boolean;
}
export const CollectionNavigation = ({
	onMoveNext,
	onMovePrev,
	isDisabled,
}: CollectionNavigationProps) => {
	return (
		<Card withOutsideShadow>
			<CollectionNavigationButtons
				onMovePrev={onMovePrev}
				onMoveNext={onMoveNext}
				isDisabled={isDisabled}
			/>
		</Card>
	);
};
