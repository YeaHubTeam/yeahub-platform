import { Skeleton } from '@/shared/ui/Skeleton';

import { TextProps } from './Text';
import { TextVariant } from './types';

export const TextSkeleton = ({
	dataTestId,
	className,
	variant,
	width,
}: Omit<TextProps, 'children'> & { width: string | number }) => {
	const skeletonHeight: Record<TextVariant, number> = {
		head1: 60 * 1.15,
		head2: 40 * 1.15,
		head3: 34 * 1.15,
		head4: 18 * 1.27,
		head5: 18 * 1.27,
		body1: 12 * 1.2,
		'body1-accent': 12 * 1.2,
		body2: 14 * 1.2,
		'body2-accent': 14 * 1.2,
		'body2-strong': 14 * 1.2,
		body3: 16 * 1.2,
		'body3-accent': 16 * 1.3,
		'body3-strong': 16 * 1.3,
		body4: 18 * 1.2,
		body5: 20 * 1.2,
		'body5-accent': 20 * 1.2,
		'body5-strong': 20 * 1.2,
		'body5-capitalize': 20 * 1.2,
		body6: 24 * 1.2,
	};

	return (
		<Skeleton
			dataTestId={dataTestId}
			className={className}
			height={skeletonHeight[variant]}
			width={width}
			borderRadius={4}
		/>
	);
};
