import { FC, ReactNode, useLayoutEffect, useRef, useState } from 'react';

import Arrow from '@/shared/assets/icons/arrow.svg';

import styles from './Block.module.css';

interface Props {
	title?: string | ReactNode;
	actionSlot?: ReactNode;
	type?: 'info' | 'profile';
	avatar?: ReactNode;
	children?: ReactNode;
	expandable?: boolean;
}

/**
 * Reusable block component
 * @param { string | ReactNode } title main block title
 * @param { ReactNode } actionSlot actionSlot may include buttons (Editing, pagination, etc.)
 * @param { 'info' | 'profile' } type the block can be of two types 'profilie' (Specialized for the profile block)
 * and 'info' for other types of block
 * @param { ReactNode } avatar if the block type is profile, then you can insert the user’s avatar into this prop
 * @param { string | ReactNode } children main block content
 * @param { boolean } expandable if the flag is true then the block is expandable (an expand button appears)
 */

export const Block: FC<Props> = ({
	title = '',
	actionSlot,
	avatar,
	children,
	type = 'info',
	expandable = false,
}) => {
	const blockRef = useRef<HTMLDivElement>(null);
	const [blockHeight, setBlockHeight] = useState(0);
	const [isExpand, setIsExpand] = useState(true);

	useLayoutEffect(() => {
		setBlockHeight((blockRef.current?.getClientRects()[0].height as number)!);
	}, []);

	const expandHandler = () => {
		setIsExpand((prev) => !prev);
	};

	const blockContent = () => (
		<>
			<div className={styles['block-header']}>
				{typeof title === 'string' ? <span>{title}</span> : title}
				{actionSlot}
			</div>
			{children}
		</>
	);

	const isProfile = type === 'profile';
	const isHeightForExpand = blockHeight > 250;
	return (
		<div
			ref={blockRef}
			className={`${styles.block} ${isProfile && styles['block-profile']} 
			${isHeightForExpand && expandable && styles['block-expandable']} 
			${!isExpand && styles['block-expanded']}`}
		>
			{isProfile && avatar}
			{isProfile ? <div className={styles['block-wrapper']}>{blockContent()}</div> : blockContent()}

			{expandable && isHeightForExpand && (
				<div className={styles['block-expand']}>
					<button onClick={expandHandler}>
						{isExpand ? 'Развернуть' : 'Свернуть'}
						<Arrow className={`${!isExpand && styles['block-arrow-expanded']}`} />
					</button>
				</div>
			)}
		</div>
	);
};
