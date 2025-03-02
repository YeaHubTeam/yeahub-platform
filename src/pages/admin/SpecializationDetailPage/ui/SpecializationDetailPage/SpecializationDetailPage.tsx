import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationByIdQuery, SpecializationCard } from '@/entities/specialization';

import { DeleteSpecializationButton } from '@/features/specialization/deleteSpecialization';

/**
 * Page showing detail info about specialization
 * @constructor
 */
const SpecializationDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { specializationId } = useParams<{ specializationId: string }>();
	const { data: specialization } = useGetSpecializationByIdQuery(String(specializationId));

	if (!specialization) {
		return null;
	}

	return (
		<main>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<DeleteSpecializationButton specializationId={specialization.id} isDetailPage />
					<NavLink
						style={{ marginLeft: 'auto' }}
						to={route(ROUTES.admin.specializations.edit.page, specialization.id)}
					>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</Flex>
			<SpecializationCard specialization={specialization} />
		</main>
	);
};

export default SpecializationDetailPage;
