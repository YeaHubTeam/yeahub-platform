import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, ROUTES, Vacancies } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { Collection, CollectionPreview } from '@/entities/collection';

import styles from './CompanyInterviewCollections.module.css';

interface CompanyInterviewCollectionsProps {
	companyTitle: string;
	collections: Collection[];
}
export const CompanyInterviewCollections = ({
	companyTitle,
	collections,
}: CompanyInterviewCollectionsProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const companyCollections = collections.filter((collection) => !collection.isFree).slice(0, 3);

	if (companyCollections.length === 0) {
		return null;
	}

	return (
		<Flex gap="20" direction="column" className={styles.container}>
			<Flex direction="row" justify="between">
				<Text variant="body6" color="black-800">
					{t(Vacancies.COLLECTIONS_SECTION_TITLE, {
						company: companyTitle,
					})}
				</Text>
				<Link to={ROUTES.wiki.collections.page} className={styles.link}>
					{t(Vacancies.COLLECTIONS_SECTION_LINK)}
					<Icon icon="arrowRight" size={24} />
				</Link>
			</Flex>
			{companyCollections.map((collection) => (
				<CollectionPreview key={collection.id} collection={collection} />
			))}
		</Flex>
	);
};
