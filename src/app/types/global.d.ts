declare module '*.module.css' {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
	import { FC, SVGProps } from 'react';

	const SVG: FC<SVGProps<SVGSVGElement>>;
	export default SVG;
}
declare module '*.avif';

type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;

declare const __IS_DEV__: boolean;

interface ApiError<T> {
	error: {
		data: ApiErrorData<T>;
	};
}

interface ApiErrorData<T> {
	message: T;
	statusCode: number;
	description: string;
}
