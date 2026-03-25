import { Notify } from "quasar";
import type { Response, RespostaServidor } from "./tipos";


export default function (error: unknown, notify = false): Response {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const erroServidor = error as RespostaServidor

    if (notify) {
      Notify.create({
        message: erroServidor.response.data.info.msg,
        position: 'top-right',
        timeout: 3000,
        type: 'negative',
      })
    }

    return erroServidor.response.data
  } else {
    return { data: {}, info: { cdg_erro: 666, msg: "Erro" } }
  }

}
