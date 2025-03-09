import { Link } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

interface KeywordsListProps {
	keywords: string[];
	path: string;
}

export const KeywordsList = ({ keywords, path }: KeywordsListProps) => {
	return (
		<Flex wrap="wrap" gap="10">
			{keywords.map((keyword) => {
				return (
					<Link key={keyword} to={path + encodeURIComponent(keyword)}>
						<Text variant="body3" color="purple-700">{`#${keyword}`}</Text>
					</Link>
				);
			})}
		</Flex>
	);
};
