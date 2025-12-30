import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsList } from '@/shared/ui/KeywordsList';
import { Text } from '@/shared/ui/Text';

interface KeywordsListSectionProps {
	keywords: string[];
	route?: string;
}

export const KeywordsListSection = ({ keywords, route }: KeywordsListSectionProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);

	return (
		<Flex direction="column" gap="8">
			<Text variant="body3" color="black-700">
				{t(Marketplace.KEYWORDS_TITLE)}
			</Text>
			<KeywordsList keywords={keywords} path={`${route}?page=1&status=all&$keywords=`} />
		</Flex>
	);
};
