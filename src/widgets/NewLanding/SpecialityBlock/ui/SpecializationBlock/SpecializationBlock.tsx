import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { mockSpecialization } from '@/widgets/NewLanding/SpecialityBlock/ui/SpecializationBlock/mockSpecialization';
import { SpecializationCard } from '@/widgets/NewLanding/SpecialityBlock/ui/SpecializationCard/SpecializationCard';

import styles from './SpecializationBlock.module.css';

export const SpecializationBlock = () => {
	const isLaptop = useMediaQuery({ query: '(min-width: 1200px) and (max-width: 1439px)' });
	const { isMobile } = useScreenSize();
	const [seeAll, setSeeAll] = useState<boolean>(false);

	const displayedItems =
		isLaptop && !seeAll
			? mockSpecialization.slice(0, 6)
			: isMobile && !seeAll
				? mockSpecialization.slice(0, 4)
				: mockSpecialization;

	return (
		<Flex direction={'column'} className={styles.container}>
			<Text variant={'head3'} className={styles.title}>
				{i18n.t(Landing.SPECIALITY_TITLE, { ns: i18Namespace.landing })}
			</Text>
			<ul className={styles['cards-list']}>
				{displayedItems.map((item) => (
					<li key={item.id}>
						<SpecializationCard
							title={item.title}
							description={item.description}
							image={item.image}
							alt={item.alt}
						/>
					</li>
				))}
			</ul>
			{(isMobile || isLaptop) && !seeAll && (
				<Button variant={'outline'} className={styles.button} onClick={() => setSeeAll(true)}>
					{i18n.t(Landing.SPECIALITY_BUTTON, { ns: i18Namespace.landing })}
				</Button>
			)}
		</Flex>
	);
};
