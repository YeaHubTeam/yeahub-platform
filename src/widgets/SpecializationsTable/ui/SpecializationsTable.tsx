import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon, Popover, IconButton } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import {
	Specialization as SpecializationI18,
	Translation,
} from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Button } from '@/shared/ui/Button';
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

	const [openPopovers, setOpenPopovers] = useState<number | null>(null);

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
		const openActions = () => {
			setOpenPopovers(specialization.id);
		};

		const closeActions = () => {
			setOpenPopovers(null);
		};

		return (
			<Flex gap="4">
				<Popover
					placement="bottom-start"
					body={
						<>
							<NavLink to={route(ROUTES.admin.specializations.details.page, specialization.id)}>
								<Flex align="center" gap="4">
									<Button
										style={{ width: 'auto', justifyContent: 'flex-start' }}
										aria-label="Large"
										preffix={<Icon icon="eye" size={20} color={'--palette-ui-purple-700'} />}
										variant="tertiary"
									>
										{t(Translation.SHOW, { ns: i18Namespace.translation })}
									</Button>
								</Flex>
							</NavLink>
							<NavLink to={route(ROUTES.admin.specializations.edit.page, specialization.id)}>
								<Flex align="center" gap="4">
									<Button
										style={{ width: 'auto', justifyContent: 'flex-start' }}
										aria-label="Large"
										preffix={<Icon icon="pencil" size={20} color={'--palette-ui-purple-700'} />}
										variant="tertiary"
									>
										{t(Translation.EDIT, { ns: i18Namespace.translation })}
									</Button>
								</Flex>
							</NavLink>
							<DeleteSpecializationButton specializationId={specialization.id} />
						</>
					}
					isOpen={openPopovers === specialization.id}
					onClickOutside={closeActions}
				>
					<div>
						<IconButton
							style={{ cursor: 'pointer' }}
							theme="tertiary"
							onClick={openActions}
							aria-label="Large"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
						/>
					</div>
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
