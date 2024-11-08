import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetSpecializationByIdQuery, SpecializationCard } from '@/entities/specialization';

/**
 * Page showing detail info about specialization
 * @constructor
 */
const SpecializationDetailPage = () => {
	const { t } = useI18nHelpers(i18Namespace.translation);
	const specializationId = useParams<{ specializationId: string }>();
	const { data: specialization } = useGetSpecializationByIdQuery(specializationId);

	if (!specialization) {
		return null;
	}

	return (
		<main>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButton />
				<NavLink
					style={{ marginLeft: 'auto' }}
					to={route(ROUTES.admin.specializations.edit.page, specialization.id)}
				>
					<Button>{t(Translation.EDIT)}</Button>
				</NavLink>
			</Flex>
			<SpecializationCard specialization={specialization} />
		</main>
	);
};

export default SpecializationDetailPage;
