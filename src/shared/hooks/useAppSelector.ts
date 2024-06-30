import { TypedUseSelectorHook, useSelector } from 'react-redux';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { RootState } from '@/app/providers/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
