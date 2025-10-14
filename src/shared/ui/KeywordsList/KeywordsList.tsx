import { Link } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

export const KeywordsListTestIds = {
	wrapper: 'KeywordsListWrapper',
	text: 'KeywordsListText',
};

interface KeywordsListProps {
	keywords: string[];
	path: string;
}

export const KeywordsList = ({ keywords, path }: KeywordsListProps) => {
	return (
		<Flex wrap="wrap" gap="14" dataTestId={KeywordsListTestIds.wrapper}>
			{keywords.map((keyword) => {
				return (
					<Link key={keyword} to={path + encodeURIComponent(keyword)}>
						<Text
							variant="body3"
							color="purple-700"
							dataTestId={KeywordsListTestIds.text}
						>{`#${keyword}`}</Text>
					</Link>
				);
			})}
		</Flex>
	);
};
