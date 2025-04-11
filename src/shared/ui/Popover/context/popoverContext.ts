import React, { createContext } from 'react';

import { usePopover } from '../hooks/usePopover';

export type ContextType =
	| (ReturnType<typeof usePopover> & {
			setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
			setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
	  })
	| null;

export const PopoverContext = createContext<ContextType>(null);
