export default {
  campo: [
    (val: string) =>
      !!val ||
      "Campo obrigatório",
  ],
}
