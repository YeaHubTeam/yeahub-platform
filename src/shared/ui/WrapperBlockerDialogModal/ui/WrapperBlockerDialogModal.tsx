import React, { ReactNode } from 'react';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';

interface BlockerWrapperProps {
	isDirty: boolean;
	children: ReactNode;
}

export const WrapperBlockerDialogModal: React.FC<BlockerWrapperProps> = ({ isDirty, children }) => {
	const blocker = useBlocker(({ currentLocation, nextLocation }) => {
		return isDirty && currentLocation.pathname !== nextLocation.pathname;
	});

	return (
		<>
			{children}
			{blocker.state === 'blocked' && (
				<BlockerDialog onCancel={blocker.reset} onOk={blocker.proceed} />
			)}
		</>
	);
};
