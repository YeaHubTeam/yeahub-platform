import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';

import { Specialization } from '@/entities/specialization';

import { DeleteSpecializationButton } from '@/features/specialization/deleteSpecialization';

interface SpecializationsTableProps {
	specializations?: Specialization[];
	selectedSpecializations?: SelectedAdminEntities;
	onSelectSpecializations?: (ids: SelectedAdminEntities) => void;
}

export const SpecializationsTable = ({
	specializations,
	selectedSpecializations,
	onSelectSpecializations,
}: SpecializationsTableProps) => {
	const { t } = useTranslation('specialization');
	const navigate = useNavigate();

	const renderTableHeader = () => {
		const columns = {
			title: t(Specializations.TITLE_SHORT),
			description: t(Specializations.DESCRIPTION_SHORT),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (specialization: Specialization) => {
		const columns = {
			title: specialization.title,
			description: specialization.description,
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderActions = (specialization: Specialization) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.specializations.details.page, specialization.id));
				},
			},
			{
				icon: <Icon icon="pencil" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.specializations.edit.page, specialization.id));
				},
			},
			{
				renderComponent: () => <DeleteSpecializationButton specializationId={specialization.id} />,
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

	if (!specializations) {
		return null;
	}

	return (
		<Table
			items={specializations}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			selectedItems={selectedSpecializations}
			onSelectItems={onSelectSpecializations}
		/>
	);
};
