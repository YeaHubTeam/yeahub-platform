import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useBlocker } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';

interface LeavingPageBlockerProps {
	isBlocked: boolean;
	children: ReactNode;
}

export const LeavingPageBlocker = ({ isBlocked, children }: LeavingPageBlockerProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const blocker = useBlocker(({ currentLocation, nextLocation }) => {
		return isBlocked && currentLocation.pathname !== nextLocation.pathname;
	});

	return (
		<>
			{children}
			{blocker.state === 'blocked' && (
				<BlockerDialog
					isOpen={blocker.state === 'blocked'}
					onClose={blocker.reset}
					message={blocker.state === 'blocked' ? t(Translation.MODAL_LEAVE_TITLE) : ''}
					onCancel={blocker.reset}
					onOk={blocker.proceed}
				/>
			)}
		</>
	);
};
