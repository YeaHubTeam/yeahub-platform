import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { AuthorInfoProps } from './AuthorInfo';

export const AuthorInfoSkeleton = ({ isCenter }: Partial<AuthorInfoProps>) => {
	return (
		<Flex justify={isCenter ? 'center' : 'start'} gap="4">
			<TextSkeleton variant="body2-accent" width={50} />
			<TextSkeleton variant="body2-accent" width={150} />
		</Flex>
	);
};
