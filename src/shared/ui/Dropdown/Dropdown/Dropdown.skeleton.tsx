import classNames from 'classnames';
import React from 'react';

import { SelectSkeleton } from '../Select/Select.skeleton';

import { dropdownTestIds } from './constants';
import { DropdownProps } from './Dropdown';
import styles from './Dropdown.module.css';

export const DropdownSkeleton = ({ size = 'L', className, width }: Partial<DropdownProps>) => {
	return (
		<div className={classNames(styles.dropdown, className)} style={{ width }}>
			<SelectSkeleton dataTestId={dropdownTestIds.dropdownSkeleton} width={width} size={size} />
		</div>
	);
};
