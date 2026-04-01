export type ObjetoArrayGenerico = { [key: string | number]: any }

export type Usuario = { id: number, nome: string, admin: number, senha?: string }

export type Card = {
  id: number | string, nome: string, id_coluna: string | number,
  usuarios: Usuario[], categorias: string[]
}

export type Cardslista = Card[]

export type Coluna = { id: number | string, nome: string, ordem: number, cards: Cardslista }

export type Colunas = Coluna[]

export type Response = { data: ObjetoArrayGenerico, info: ServidorInfo }

export type ServidorInfo = { msg: string, cdg_erro: number }

export type RespostaServidor = { response: { data: Response } }
