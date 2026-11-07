import { userByIdMock } from './userByIdMock';
import { usersListMock } from './userListMock';
import { userRolesListMock } from './userRolesListMock';

export const userHandlers = [usersListMock, userRolesListMock, userByIdMock];
export { userRolesMock } from './data/userRolesMock';

export {
	adminUser,
	authorUser,
	userFreeUser,
	userPremiumUser,
	userUnverifiedUser,
} from './data/usersDataMock';
export { authorAuthor, adminAuthor } from './data/userAuthorsMock';
