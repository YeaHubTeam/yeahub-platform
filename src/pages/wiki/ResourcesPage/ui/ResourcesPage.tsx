import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

const ResourcesPage = () => {
	const { t } = useTranslation([i18Namespace.translation]);

	return (
		<section>
			<Flex direction="column" gap="24">
				<Text variant="head2">{t(Translation.SIDEBAR_MENU_WIKI_RESOURCES_TITLE)}</Text>
			</Flex>
		</section>
	);
};

export default ResourcesPage;
