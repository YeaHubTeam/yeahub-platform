import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Specialization } from '../../model/types/specialization';

import styles from './SpecializationCard.module.css';

interface SpecializationCardProps {
	specialization: Specialization;
}

export const SpecializationCard = ({ specialization }: SpecializationCardProps) => {
	const { t } = useTranslation(i18Namespace.specialization);
	return (
		<Flex>
			<Flex direction="column" gap="24" style={{ flex: '0 1 740px' }}>
				<Card withOutsideShadow>
					<Flex gap="16">
						<div className={classNames(styles['title-img-block'])}>
							<ImageWithWrapper
								className={classNames(styles['title-img-block-image'])}
								src={specialization.imageSrc}
								alt={t(Specializations.IMAGE_ALT)}
							/>
						</div>
						<Flex maxWidth direction="column">
							<Text
								variant="body6"
								color="black-800"
								isMainTitle
								className={styles['title-block-title']}
							>
								{specialization.title}
							</Text>
						</Flex>
					</Flex>
				</Card>
				<Card withOutsideShadow>
					<Text variant="body5-accent" color="black-800" className={styles['title-description']}>
						{t(Specializations.DESCRIPTION_FULL)}
					</Text>
					<Text variant="body3-accent" color="black-800">
						{specialization.description}
					</Text>
				</Card>
			</Flex>
		</Flex>
	);
};
