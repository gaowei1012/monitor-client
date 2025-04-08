import { create } from 'zustand'

type ILoginState = {
  isLogin: boolean
}

export const useLoginState = create<ILoginState>(() => ({
  isLogin: false
}))

export const setLoginState = (status: boolean) => useLoginState.setState({ isLogin: status })
