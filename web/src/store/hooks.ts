import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TAppDispatch, TAppStore, TRootState } from './store'

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>()
export const useAppSelector = useSelector.withTypes<TRootState>()
export const useAppStore = useStore.withTypes<TAppStore>()
