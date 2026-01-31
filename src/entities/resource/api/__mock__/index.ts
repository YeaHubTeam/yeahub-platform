import { myRequestsResoursesMock } from './myRequestsResoursesMock';
import { resourceByIdMock } from './resourceMock';
import { resourcesListMock } from './resourcesListMock';
import { resourcesRequestsMock } from './resourcesRequestsMock';

export const resourcesHandlers = [
	resourcesListMock,
	resourceByIdMock,
	myRequestsResoursesMock,
	resourcesRequestsMock,
];
