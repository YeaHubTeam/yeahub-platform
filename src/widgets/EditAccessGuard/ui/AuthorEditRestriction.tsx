import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/shared/libs';
import { Stub } from '@/shared/ui/Stub';

import { getIsAuthor, getUserId } from '@/entities/profile';

interface EditAccessGuardProps {
	authorId?: string | null;
	children: ReactNode;
	titleStub?: string;
	subtitleStub?: string;
	buttonTextStub?: string;
	redirectTo: string;
}

export const AuthorEditRestriction = ({
	authorId,
	children,
	titleStub,
	subtitleStub,
	buttonTextStub,
	redirectTo,
}: EditAccessGuardProps): ReactNode => {
	const navigate = useNavigate();
	const isAuthor = useAppSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);
	const canEdit = isAuthor && userId === authorId;

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
