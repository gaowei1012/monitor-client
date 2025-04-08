import { create } from 'zustand'

type ICardState = {
  cardState: boolean
}

export const useCardState = create<ICardState>(() => ({
  cardState: false,
}))

export const setCheckCardState = (status: boolean) => useCardState.setState({ cardState: status })
