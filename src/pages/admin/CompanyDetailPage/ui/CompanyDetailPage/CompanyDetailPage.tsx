import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { CompanyCard, useGetCompanyByIdQuery } from '@/entities/company';

import { DeleteCompanyButton } from '@/features/company/deleteCompany';

const CompanyDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { companyId } = useParams();
	const { data: company } = useGetCompanyByIdQuery({ companyId: companyId! });

	if (!company) {
		return null;
	}

	return (
		<main>
			<Flex align={'center'} justify={'between'} gap={'8'} style={{ marginBottom: 24 }}>
				<BackButton />

				<Flex gap={'16'}>
					<DeleteCompanyButton companyId={company.id} isDetailPage />
					<NavLink to={route(ROUTES.admin.companies.edit.page, company.id)}>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</Flex>
			<CompanyCard company={company} />
		</main>
	);
};

export default CompanyDetailPage;
