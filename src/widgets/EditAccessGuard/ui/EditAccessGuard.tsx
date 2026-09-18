import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stub } from '@/shared/ui/Stub';

import { useCanManageAdminEntity } from '@/entities/profile';

interface EditAccessGuardProps {
	authorId?: string | null;
	children: ReactNode;
	titleStub?: string;
	subtitleStub?: string;
	buttonTextStub?: string;
	redirectTo: string;
}

export const EditAccessGuard = ({
	authorId,
	children,
	titleStub,
	subtitleStub,
	buttonTextStub,
	redirectTo,
}: EditAccessGuardProps): ReactNode => {
	const navigate = useNavigate();
	const canEdit = useCanManageAdminEntity({ ownerId: authorId });

	if (canEdit) return children;

	return (
		<Stub
			type="access-denied"
			title={titleStub}
			subtitle={subtitleStub}
			buttonText={buttonTextStub}
			onClick={() => navigate(redirectTo)}
		/>
	);
};
