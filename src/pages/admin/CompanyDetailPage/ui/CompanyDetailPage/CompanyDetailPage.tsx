import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Companies, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector } from '@/shared/hooks';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Tooltip } from '@/shared/ui/Tooltip';

import { CompanyCard, useGetCompanyByIdQuery } from '@/entities/company';
import { getUserId } from '@/entities/profile';

import { DeleteCompanyButton } from '@/features/company/deleteCompany';

const CompanyDetailPage = () => {
	const { t } = useTranslation([i18Namespace.companies, i18Namespace.translation]);

	const { companyId } = useParams();
	const { data: company } = useGetCompanyByIdQuery({ companyId: companyId! });
	const userId = useAppSelector(getUserId);

	const isDisabled = company?.createdBy?.id !== userId;

	if (!company) {
		return null;
	}

	return (
		<main>
			<Flex align={'center'} justify={'between'} gap={'8'} style={{ marginBottom: 24 }}>
				<BackButton />
				<Flex gap={'16'}>
					<Tooltip title={t(Companies.TOOLTIP_BUTTON_DISABLED)} color={'red'} placement="bottom">
						<DeleteCompanyButton companyId={company.id} isDetailPage disabled={isDisabled} />
					</Tooltip>
					<Tooltip title={t(Companies.TOOLTIP_BUTTON_DISABLED)} color={'red'} placement="bottom">
						<NavLink to={route(ROUTES.admin.companies.edit.page, company.id)}>
							<Button disabled={isDisabled}>{t(Translation.EDIT)}</Button>
						</NavLink>
					</Tooltip>
				</Flex>
			</Flex>
			<CompanyCard company={company} />
		</main>
	);
};

export default CompanyDetailPage;
