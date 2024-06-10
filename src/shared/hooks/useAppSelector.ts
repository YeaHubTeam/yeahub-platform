import { TypedUseSelectorHook, useSelector } from 'react-redux';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { createReduxStore } from '@/app/providers/store';

export const useAppSelector: TypedUseSelectorHook<typeof createReduxStore> = useSelector;
