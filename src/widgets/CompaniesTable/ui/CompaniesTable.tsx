import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Companies, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { Company } from '@/entities/company';

import { DeleteCompanyButton } from '@/features/company/deleteCompany';

import styles from './CompaniesTable.module.css';

interface UICompany extends Company {
	disabled?: boolean;
}

interface CompaniesTableProps {
	companies?: UICompany[];
	selectedCompanies?: SelectedAdminEntities;
	onSelectCompanies?: (ids: SelectedAdminEntities) => void;
}

export const CompaniesTable = ({
	companies,
	selectedCompanies,
	onSelectCompanies,
}: CompaniesTableProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.companies, i18Namespace.translation]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			imageSrc: '100px',
			title: 'auto',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			imageSrc: t(Companies.ICON_SHORT),
			title: t(Companies.TITLE_SHORT),
		};
		return Object.entries(columns)?.map(([key, value]) => <td key={key}>{value}</td>);
	};

	const renderTableBody = (company: Company) => {
		const columns = {
			imageSrc: (
				<ImageWithWrapper
					src={company.imageSrc}
					alt={`${t(Translation.LOGO)} ${company.title}`}
					className={styles['card-image']}
				/>
			),
			title: company.title,
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k}>
				{k === 'title' ? (
					<Link to={route(ROUTES.admin.companies.details.route, company.id)}>
						<Text variant={'body3-accent'}>{v}</Text>
					</Link>
				) : (
					v
				)}
			</td>
		));
	};

	const renderActions = (company: UICompany) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.companies.details.route, company.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				tooltip: {
					color: 'red',
					text: t(Translation.TOOLTIP_COMPANY_DISABLED_INFO, { ns: i18Namespace.translation }),
				},
				disabled: company.disabled,
				onClick: () => {
					navigate(route(ROUTES.admin.companies.edit.route, company.id));
				},
			},
			{
				renderComponent: () => (
					<DeleteCompanyButton companyId={company.id} disabled={company.disabled} />
				),
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
							form="square"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!companies) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={companies as SelectedAdminEntities}
			selectedItems={selectedCompanies}
			onSelectItems={onSelectCompanies}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
