import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Text, Icon } from 'yeahub-ui-kit';

import { Specialization as SpecializationI18 } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Table } from '@/shared/ui/Table';

import { Specialization } from '@/entities/specialization';

import { DeleteSpecializationButton } from '@/features/specialization/deleteSpecialization';

interface SpecializationsTableProps {
	specializations?: Specialization[];
	selectedSpecializations?: number[];
	onSelectSpecializations?: (ids: number[]) => void;
}

export const SpecializationsTable = ({
	specializations,
	selectedSpecializations,
	onSelectSpecializations,
}: SpecializationsTableProps) => {
	const { t } = useTranslation('specialization');

	const renderTableHeader = () => {
		const columns = {
			title: t(SpecializationI18.SPECIALIZATION_TITLE),
			description: t(SpecializationI18.SPECIALIZATION_DESCRIPTION),
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
		return (
			<Flex gap="4">
				<NavLink to={`/specializations/${specialization.id}`}>
					<Icon icon="eye" size={20} color={'--palette-ui-purple-700'} />
				</NavLink>
				<NavLink to={`/specializations/${specialization.id}/edit`}>
					<Icon icon="pencil" size={20} color={'--palette-ui-purple-700'} />
				</NavLink>
				<DeleteSpecializationButton specializationId={specialization.id} />
			</Flex>
		);
	};

	if (!specializations) {
		return (
			<Flex maxHeight align="center" justify="center">
				<Text title={t(SpecializationI18.SPECIALIZATIONS_NOT_ITEMS)} />
			</Flex>
		);
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
