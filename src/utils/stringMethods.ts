export const normalizeName = (name: string) => {
  const nameParts = name.split(/\s+/)
  const filteredNameParts = nameParts.filter((part) => part.trim() !== '')

  const formattedNameParts = filteredNameParts.map((part) =>
    part.toLowerCase() === 'la' ? part : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  )

  const normalizedName = formattedNameParts.join(' ')
  return normalizedName
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length !== 10) {
    return phoneNumber
  }

  const part1 = phoneNumber.slice(0, 3)
  const part2 = phoneNumber.slice(3, 6)
  const part3 = phoneNumber.slice(6, 10)

  return `${part1}-${part2} (${part3})`
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const day = date.getUTCDate()
  const month = monthNames[date.getUTCMonth()]
  const year = date.getUTCFullYear()

  let hours = date.getUTCHours()
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12

  return `${month} ${day}, ${year} - ${hours}:${minutes} ${ampm}`
}

export const compareDates = (createdAt: string, updatedAt: string): string => {
  const createdDate = new Date(createdAt)
  const updatedDate = new Date(updatedAt)

  if (createdDate.getTime() === updatedDate.getTime()) {
    return formatDate(createdAt)
  } else {
    return `${formatDate(updatedAt)} (editado)`
  }
}

export const truncateString = (str: string | undefined, maxLength: number): string => {
  if (!str) return ''
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...'
  }
  return str
}