import { myRequestsResoursesMock } from './myRequestsResoursesMock';
import { resourceByIdMock } from './resourceMock';
import { resourceRequestByIdMock } from './resourceRequestByIdMock';
import { resourcesListMock } from './resourcesListMock';
import { resourcesRequestsMock } from './resourcesRequestsMock';

export const resourcesHandlers = [
	resourcesListMock,
	resourceByIdMock,
	myRequestsResoursesMock,
	resourcesRequestsMock,
	resourceRequestByIdMock,
];
