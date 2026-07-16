import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { useScreenSize } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import {
	SpecializationCard,
	SpecializationAdditionalInfo,
	Specialization,
} from '@/entities/specialization';

import { DeleteSpecializationButton } from '@/features/specialization/deleteSpecialization';

import { SpecializationHeader } from '@/widgets/specialization/SpecializationHeader';

import styles from './SpecializationPageContent.module.css';

export interface SpecializationPageContentProps {
	specialization: Specialization;
}

export const SpecializationPageContent = ({ specialization }: SpecializationPageContentProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<BackHeader>
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<DeleteSpecializationButton specializationId={specialization.id} isDetailPage />
					<NavLink
						style={{ marginLeft: 'auto' }}
						to={route(ROUTES.admin.specializations.edit.page, specialization.id)}
					>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</BackHeader>
			<Flex gap="20">
				<Flex gap="20" direction="column" flex={1} maxWidth>
					<Flex>
						<Flex direction="column" gap="24" flex={1}>
							<SpecializationHeader specialization={specialization} />
							<SpecializationCard specialization={specialization} />
						</Flex>
					</Flex>
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<SpecializationAdditionalInfo specialization={specialization} />
					</Flex>
				)}
			</Flex>
		</>
	);
};
