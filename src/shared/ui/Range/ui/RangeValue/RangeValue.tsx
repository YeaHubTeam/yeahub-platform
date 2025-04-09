import { ReactNode } from 'react';

import { useRangeContext } from '../../lib/context/useRangeContext';

interface Props {
	icon: ReactNode;
	value: number;
}

export const RangeValue = ({ icon, value }: Props) => {
	const { hasScale } = useRangeContext();

	if (icon) return icon;

	if (!icon && !hasScale) {
		return value;
	}
};
