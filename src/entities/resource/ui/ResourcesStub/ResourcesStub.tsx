import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Resources, ROUTES } from '@/shared/config';
import { Stub } from '@/shared/ui/Stub';

interface ResourcesStubProp {
	hasFilters: boolean;
	onResetFilters: () => void;
	hasResources: boolean;
}

export const ResourcesStub = ({ hasFilters, hasResources, onResetFilters }: ResourcesStubProp) => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.resources);

	if (!hasResources && hasFilters) return <Stub type="filter-empty" onClick={onResetFilters} />;

	return (
		<Stub
			type="empty"
			title={t(Resources.STUB_EMPTY_RESOURCES_TITLE)}
			subtitle={t(Resources.STUB_EMPTY_RESOURCES_SUBTITLE)}
			buttonText={t(Resources.STUB_EMPTY_RESOURCES_SUBMIT)}
			onClick={() => navigate(ROUTES.wiki.resources.my.create.page)}
		/>
	);
};
