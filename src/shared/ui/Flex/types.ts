import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export type FlexAlign = 'start' | 'center' | 'end' | 'normal';

export type FlexWrap = 'wrap' | 'nowrap';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type FlexGap =
	| '4'
	| '6'
	| '8'
	| '10'
	| '12'
	| '14'
	| '16'
	| '20'
	| '24'
	| '26'
	| '28'
	| '30'
	| '32'
	| '40'
	| '48'
	| '52'
	| '60'
	| '100'
	| '120';

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
