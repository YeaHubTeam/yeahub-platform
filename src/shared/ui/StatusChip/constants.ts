import { Pallete } from '@/shared/libs';
import { StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';

export const statusChipVariants: Record<StatusChipVariant, Pallete> = {
	red: 'red-900',
	yellow: 'yellow-900',
	green: 'green-900',
	purple: 'purple-800',
};

export const statusChipTestIds = {
	statusChip: 'StatusChip',
	statusChipText: 'StatusChip_Text',
};
