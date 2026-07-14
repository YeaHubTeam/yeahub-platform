import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { type Specialization } from '@/entities/specialization';

import { SpecializationAdditionalInfoDrawer } from '../SpecializationAdditionalInfoDrawer/SpecializationAdditionalInfoDrawer';

import styles from './SpecializationHeader.module.css';

interface SpecializationHeaderProps {
	specialization: Specialization;
}

export const SpecializationHeader = ({ specialization }: SpecializationHeaderProps) => {
	const { t } = useTranslation(i18Namespace.specialization);
	const { isMobile, isTablet } = useScreenSize();

	const imageClassName = isMobile ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card withOutsideShadow>
			<Flex gap="16" direction={isMobile ? 'column' : 'row'}>
				<ImageWithWrapper
					className={imageClassName}
					src={specialization.imageSrc}
					alt={t(Specializations.IMAGE_ALT)}
				/>
				<Flex justify="between" align="start" gap="8" maxWidth>
					<Text
						variant={isMobile ? 'body5' : 'body6'}
						color="black-800"
						isMainTitle
						className={styles.title}
					>
						{specialization.title}
					</Text>
					{(isMobile || isTablet) && (
						<SpecializationAdditionalInfoDrawer specialization={specialization} />
					)}
				</Flex>
			</Flex>
		</Card>
	);
};
