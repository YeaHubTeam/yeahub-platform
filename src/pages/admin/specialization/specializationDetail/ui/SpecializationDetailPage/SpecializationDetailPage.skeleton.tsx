import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { SpecializationCardSkeleton } from '@/entities/specialization';

export const SpecializationDetailPageSkeleton = () => {
	return (
		<>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButtonSkeleton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<ButtonSkeleton
						style={{
							width: 'auto',
							padding: '0 32px',
							justifyContent: 'center',
						}}
						variant="destructive"
					/>
					<ButtonSkeleton style={{ marginLeft: 'auto' }} />
				</Flex>
			</Flex>
			<SpecializationCardSkeleton />
		</>
	);
};
