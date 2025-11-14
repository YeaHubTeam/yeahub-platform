// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Role } from '@/entities/auth';

export const mockRoles: Role[] = [
	{ id: 1, name: 'candidate', permissions: [] },
	{ id: 2, name: 'HR', permissions: [] },
	{ id: 3, name: 'admin', permissions: [] },
	{ id: 4, name: 'guest', permissions: [] },
];
