import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { InputSkeleton } from '@/shared/ui/Input';

import { socialNetworks } from '../../model/data/socialNetwork';

export const SocialNetWorkInputsSkeleton = () => {
	return (
		<Flex gap="20" maxWidth wrap="wrap">
			{socialNetworks.map((socialNetwork) => (
				<FormControlSkeleton key={socialNetwork.code} label="label">
					<InputSkeleton size="S" />
				</FormControlSkeleton>
			))}
		</Flex>
	);
};
