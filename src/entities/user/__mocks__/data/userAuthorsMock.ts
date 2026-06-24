import { Author } from '@/shared/ui/AuthorInfo';

import { adminUser, authorUser } from './usersDataMock';

export const adminAuthor: Author = {
	id: adminUser.id,
	username: adminUser.username,
};

export const authorAuthor: Author = {
	id: authorUser.id,
	username: authorUser.username,
};
