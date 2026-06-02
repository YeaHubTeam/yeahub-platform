import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Tooltip } from '@/shared/ui/Tooltip';

import { type Company, CompanyCard } from '@/entities/company';

import { DeleteCompanyButton } from '@/features/company/deleteCompany';

interface CompanyDetailPageContentProps {
	company: Company;
	isDisabled: boolean;
}

const CompanyDetailPageContent = ({ company, isDisabled }: CompanyDetailPageContentProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<>
			<BackHeader>
				<DeleteCompanyButton companyId={company.id} isDetailPage disabled={isDisabled} />
				<Tooltip
					title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
					color="red"
					placement="bottom-start"
					shouldShowTooltip={isDisabled}
				>
					<NavLink to={route(ROUTES.admin.companies.edit.page, company.id)}>
						<Button disabled={isDisabled}>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Tooltip>
			</BackHeader>
			<CompanyCard company={company} />
		</>
	);
};

export default CompanyDetailPageContent;
