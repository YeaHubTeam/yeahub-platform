import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationByIdQuery, SpecializationCard } from '@/entities/specialization';

import { DeleteSpecializationButton } from '@/features/specialization/deleteSpecialization';

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
