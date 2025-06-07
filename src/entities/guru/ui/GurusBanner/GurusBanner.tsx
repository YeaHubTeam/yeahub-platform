import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Guru } from '../../model/types/guru';
import { GurusHeader } from '../GurusHeader/GurusHeader';
import { GurusList } from '../GurusList/GurusList';

interface GurusBannerProps {
	variant?: 'list' | 'single';
	gurus: Guru[];
}

export const GurusBanner = ({ variant = 'single', gurus }: GurusBannerProps) => {
	return (
		<Card withBorder>
			<Flex direction="column" gap="24">
				{variant === 'list' && <GurusHeader />}
				<GurusList variant={variant} gurus={gurus} />
			</Flex>
		</Card>
	);
};
