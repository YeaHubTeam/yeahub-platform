import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route, useAppSelector } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Tooltip } from '@/shared/ui/Tooltip';

import { CompanyCard, useGetCompanyByIdQuery } from '@/entities/company';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { DeleteCompanyButton } from '@/features/company/deleteCompany';

const CompanyDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { companyId } = useParams();
	const { data: company } = useGetCompanyByIdQuery({ companyId: companyId! });
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);

	const isDisabled = isAuthor && company?.createdBy?.id !== userId;

	if (!company) {
		return null;
	}

	return (
		<main>
			<Flex align="center" justify="between" gap="8" style={{ marginBottom: 24 }}>
				<BackButton />
				<Flex gap="16">
					<Tooltip
						title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
						color="red"
						placement="bottom-start"
						shouldShowTooltip={isDisabled}
					>
						<DeleteCompanyButton companyId={company.id} isDetailPage disabled={isDisabled} />
					</Tooltip>
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
				</Flex>
			</Flex>
			<CompanyCard company={company} />
		</main>
	);
};

export default CompanyDetailPage;
