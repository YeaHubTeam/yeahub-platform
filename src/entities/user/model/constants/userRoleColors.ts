import { StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { RoleName } from '@/entities/auth';

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
