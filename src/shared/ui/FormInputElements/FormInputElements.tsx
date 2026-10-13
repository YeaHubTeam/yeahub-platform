import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import PlusSvg from '@/shared/assets/icons/plus1.svg';
import { i18Namespace, Translation } from '@/shared/config';
import { useModal } from '@/shared/libs';

import { Button } from '../Button';
import { Chip } from '../Chip';
import { Drawer } from '../Drawer';
import { Flex } from '../Flex';
import { Text } from '../Text';

import styles from './FormInputElements.module.css';

interface Item {
	id: string | number;
	title: string;
}

interface FormInputElementsProps<T extends Item> {
	shortText: string;
	labelText: string;
	selectedCountText: string;
	selectedItems: T[];
	handleUnselectItem: (id: T['id']) => void;
	children: ReactNode;
}

export const FormInputElements = <T extends Item>({
	shortText,
	labelText,
	selectedCountText,
	selectedItems,
	handleUnselectItem,
	children,
}: FormInputElementsProps<T>) => {
	const { t } = useTranslation([i18Namespace.translation]);

	const { isOpen, onToggle, onClose } = useModal();

	return (
		<>
			<Flex className={selectedItems.length !== 0 ? styles.column : styles.row}>
				<Flex gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text variant="body4">{shortText}</Text>
						<Text variant="body2">{labelText}</Text>
					</Flex>
					<Flex direction="column" gap="24" className={styles['selected-items']}>
						<Text variant="body3-accent">{selectedCountText}</Text>
						<Flex direction="column" gap="16">
							{selectedItems.map((item) => (
								<Chip
									key={item.id}
									className={styles['chip']}
									theme="primary"
									label={item.title}
									onDelete={() => handleUnselectItem(item.id)}
								/>
							))}
						</Flex>
					</Flex>
				</Flex>
				<Button onClick={onToggle} className={styles['add-button']}>
					{t(Translation.CREATE)}
					<PlusSvg className={styles['plus-svg']} />
				</Button>
			</Flex>
			<Drawer isOpen={isOpen} onClose={onClose} rootName="body" className={styles['drawer']}>
				{children}
			</Drawer>
		</>
	);
};
