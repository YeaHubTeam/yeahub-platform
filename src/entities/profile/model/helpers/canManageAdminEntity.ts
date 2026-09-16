interface CanManageAdminEntityParams {
	isAdmin: boolean;
	isAuthor: boolean;
	userId: string;
	ownerId?: string | null;
	accessType?: 'owner-or-admin' | 'admin-only';
}

export const canManageAdminEntity = ({
	isAdmin,
	isAuthor,
	userId,
	ownerId,
	accessType = 'owner-or-admin',
}: CanManageAdminEntityParams) => {
	if (isAdmin) {
		return true;
	}

	if (accessType === 'admin-only') {
		return false;
	}

	return isAuthor && (!ownerId || ownerId === userId);
};
