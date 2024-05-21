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