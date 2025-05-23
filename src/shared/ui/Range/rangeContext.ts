import { createContext } from 'react';

import { RangeProps } from './types';

type ContextType =
	| (Omit<RangeProps, 'className' | 'onChange' | 'valueLabel' | 'onChange'> & {
			thumbWidth: number;
			sliderWidth: number;
			isDraggable: boolean;
	  })
	| null;

export const RangeContext = createContext<ContextType>(null);
