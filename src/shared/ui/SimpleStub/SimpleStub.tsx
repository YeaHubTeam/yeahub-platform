import { FC, SVGProps } from 'react';

import Auth from '@/shared/assets/icons/auth.svg';
import Clock from '@/shared/assets/icons/clockSquare.svg';
import Lock from '@/shared/assets/icons/lockKeyholeMinimalistic.svg';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { simpleStubTestIds } from './constants';
import styles from './SimpleStub.module.css';

export type SimpleStubVariant = 'no-authorized' | 'empty' | 'no-access';

interface SimpleStubProps {
	variant: SimpleStubVariant;
	text: string;
}

export const SimpleStub = ({ variant, text }: SimpleStubProps) => {
	const { isMobile } = useScreenSize();
	const size = isMobile ? 44 : 76;

	const images: Record<SimpleStubVariant, FC<SVGProps<SVGSVGElement>>> = {
		'no-access': Lock,
		empty: Clock,
		'no-authorized': Auth,
	};

	const Image = images[variant];

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex justify="center" align="center" gap="8" direction="column">
				<Image
					width={size}
					height={size}
					className={styles.icon}
					data-testid={simpleStubTestIds.simpleStubIcon(variant)}
				/>
				<Text variant="body4" className={styles.text} dataTestId={simpleStubTestIds.simpleStubText}>
					{text}
				</Text>
			</Flex>
		</Card>
	);
};
