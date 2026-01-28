import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Switch } from '@/shared/ui/Switch';

import { useMyRequestsFilter } from '../model/hooks';

export const MyRequestsToggle = () => {
	const { t } = useTranslation([i18Namespace.translation]);
	const { isMy, toggleMyRequests } = useMyRequestsFilter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		toggleMyRequests(e.target.checked);
	};

	return (
		<Switch
			checked={isMy}
			onChange={handleChange}
			label={t(Translation.CRUMBS_RESOURCES_MY_REQUEST)}
		/>
	);
};
