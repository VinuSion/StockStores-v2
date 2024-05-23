export const formatTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

export const formatPrice = (value: number): string => {
  return value.toLocaleString('es-CO');
}