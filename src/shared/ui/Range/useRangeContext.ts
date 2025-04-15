import { useContext } from 'react';

import { RangeContext } from './rangeContext';

export const useRangeContext = () => {
	const context = useContext(RangeContext);

	if (context == null) {
		throw new Error('useRange must be used within a <Range/>');
	}

	return context;
};
