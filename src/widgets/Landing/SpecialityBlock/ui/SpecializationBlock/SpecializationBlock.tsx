import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { i18Namespace } from '@/shared/config/i18n/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { mockSpecialization } from '@/widgets/Landing/SpecialityBlock/ui/SpecializationBlock/mockSpecialization';
import { SpecializationCard } from '@/widgets/Landing/SpecialityBlock/ui/SpecializationCard/SpecializationCard';

import styles from './SpecializationBlock.module.css';

export const SpecializationBlock = () => {
	const isLaptop = useMediaQuery({ query: '(min-width: 1200px) and (max-width: 1439px)' });
	const { isMobile } = useScreenSize();
	const [seeAll, setSeeAll] = useState<boolean>(false);
	const { t } = useTranslation(i18Namespace.landing);
	const displayedItems =
		isLaptop && !seeAll
			? mockSpecialization.slice(0, 6)
			: isMobile && !seeAll
				? mockSpecialization.slice(0, 4)
				: mockSpecialization;

	return (
		<Flex direction={'column'} className={styles.container}>
			<Text variant={isMobile ? 'body5-accent' : 'head3'} className={styles.title}>
				{t(Landing.SPECIALIZATION_NEW_TITLE)}
			</Text>
			<ul className={styles['cards-list']}>
				{displayedItems.map((item) => (
					<li key={item.id}>
						<SpecializationCard
							title={t(item.title)}
							description={t(item.description)}
							image={item.image}
							alt={item.alt}
							link={item.link}
						/>
					</li>
				))}
			</ul>
			{(isMobile || isLaptop) && !seeAll && (
				<Button variant={'outline'} className={styles.button} onClick={() => setSeeAll(true)}>
					{t(Landing.SPECIALIZATION_BUTTON)}
				</Button>
			)}
		</Flex>
	);
};
