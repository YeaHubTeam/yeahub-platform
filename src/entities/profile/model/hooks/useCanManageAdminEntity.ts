import { useAppSelector } from '@/shared/libs';

import { canManageAdminEntity } from '../helpers/canManageAdminEntity';
import { getIsAdmin, getIsAuthor, getUserId } from '../selectors/profileSelectors';

interface UseCanManageAdminEntityParams {
	ownerId?: string | null;
	accessType?: 'owner-or-admin' | 'admin-only';
}

export const useCanManageAdminEntity = ({
	ownerId,
	accessType = 'owner-or-admin',
}: UseCanManageAdminEntityParams) => {
	const isAdmin = useAppSelector(getIsAdmin);
	const isAuthor = useAppSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);

	return canManageAdminEntity({
		isAdmin: Boolean(isAdmin),
		isAuthor: Boolean(isAuthor),
		userId,
		ownerId,
		accessType,
	});
};
