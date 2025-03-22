export const userApiUrls = {
	getUsersList: 'users',
	getUserById: 'users/:userId',
	getRelatedUserById: 'users/related-users/:userId',
	getUserRolesList: 'users/roles',
	addUserRoles: `users/:userId/roles-add`,
	removeUserRoles: `users/:userId/roles-remove`,
};
