export type ObjetoArrayGenerico = { [key: string | number]: any }

export type Card = { id: number | string, titulo: string, id_coluna: string | number }

export type Lista = Card[]

export type Coluna = { id: number | string, titulo_coluna: string, cards: Lista }[]

export type Response = { data: ObjetoArrayGenerico, info: ServidorInfo }

export type ServidorInfo = { msg: string, cdg_erro: number }

export type RespostaServidor = { response: { data: Response } }
