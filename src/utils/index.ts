export const $SEl = async (el: string) => {
  return document.querySelector(el) as HTMLElement
}
export default {
  $SEl
} as {
  $SEl(el: string): any
}
