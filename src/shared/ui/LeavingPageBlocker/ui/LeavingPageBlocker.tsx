import React, { ReactNode } from 'react';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';

interface LeavingPageBlockerProps {
	isBlocked: boolean;
	children: ReactNode;
}

export const LeavingPageBlocker = ({ isBlocked, children }: LeavingPageBlockerProps) => {
	const blocker = useBlocker(({ currentLocation, nextLocation }) => {
		return isBlocked && currentLocation.pathname !== nextLocation.pathname;
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
