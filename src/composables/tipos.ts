export type Card = { id: number | string, titulo: string, id_coluna: string | number }

export type Lista = Card[]

export type Coluna = { id: number | string, titulo_coluna: string, cards: Lista }[]
