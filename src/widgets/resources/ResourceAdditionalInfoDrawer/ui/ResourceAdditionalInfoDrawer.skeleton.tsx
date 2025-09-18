import { IconButtonSkeleton } from '@/shared/ui/IconButton';

export const ResourceAdditionalInfoDrawerSkeleton = () => {
	return (
		<>
			<IconButtonSkeleton
				aria-label="icon skeleton"
				form="square"
				size="small"
				variant="tertiary"
			/>
		</>
	);
};
