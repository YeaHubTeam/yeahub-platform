import { StatusChipVariant } from '@/shared/ui/StatusChip';

import { RoleName } from '@/entities/auth/@x/user';

export const userRoleColors: Record<RoleName, StatusChipVariant> = {
	candidate: 'yellow',
	'candidate-premium': 'yellow',
	'candidate-free': 'yellow',
	HR: 'red',
	author: 'red',
	guest: 'purple',
	member: 'purple',
	admin: 'green',
};
