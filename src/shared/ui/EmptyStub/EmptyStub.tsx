import SearchImg from '@/shared/assets/images/searchPage.png';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Button } from '../Button';

import styles from './EmptyStub.module.css';

interface EmptyStubProps {
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	buttonText: string;
}

export const EmptyStub = ({ text, onClick, buttonText }: EmptyStubProps) => {
	const { isMobile } = useScreenSize();
	const textVariant = isMobile ? 'body3-strong' : 'body4';
	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex justify="between" align="center" gap="20" direction="column" className={styles.flex}>
				<img src={SearchImg} alt="" className={styles['card-img']}></img>
				<Text variant={textVariant} className={styles.text}>
					{text}
				</Text>
				<Button className={styles.button} size="large" variant="primary" onClick={onClick}>
					{buttonText}
				</Button>
			</Flex>
		</Card>
	);
};
