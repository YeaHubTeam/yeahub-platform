import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { UserCardSkeleton } from '@/entities/user';

export const UserEditPageSkeleton = () => {
	return (
		<>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButtonSkeleton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<ButtonSkeleton width={150} style={{ marginLeft: 'auto' }} />
					<ButtonSkeleton width={150} style={{ marginLeft: 'auto' }} />
				</Flex>
			</Flex>
			<UserCardSkeleton />
		</>
	);
};
