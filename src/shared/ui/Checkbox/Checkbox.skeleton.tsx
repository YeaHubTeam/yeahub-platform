import { Skeleton } from '../Skeleton';

import { checkBoxTestIDs } from './constants';

export const CheckboxSkeleton = () => {
	return (
		<Skeleton
			width={20}
			height={20}
			borderRadius="4px"
			dataTestId={checkBoxTestIDs.checkboxSkeleton}
		/>
	);
};
