export default function (objeto: { [index: string | number]: any }) {
  try {
    return JSON.parse(JSON.stringify(objeto))
  } catch {
    return {}
  }
}
