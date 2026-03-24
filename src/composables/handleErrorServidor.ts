import type { Response, RespostaServidor } from "./tipos";

export default function (error: unknown): Response {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const erroServidor = error as RespostaServidor

    return erroServidor.response.data
  } else {
    return { data: {}, info: { cdg_erro: 666, msg: "Erro" } }
  }

}
