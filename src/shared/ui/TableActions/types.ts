import { ROUTES } from '@/shared/config';

type AdminRoutes = typeof ROUTES.admin;

export type TableAction = 'detail' | 'edit' | 'delete' | 'copy';

export type TableActionsEntity = {
	[K in keyof AdminRoutes]: AdminRoutes[K] extends {
		details: { route: string };
		edit: { route: string };
	}
		? K
		: never;
}[keyof AdminRoutes];

export interface TableActionsProps {
	actions?: TableAction[];
	entity: TableActionsEntity;
	id: string | number;
	disabled?: boolean;
	onDelete?: () => void;
}
