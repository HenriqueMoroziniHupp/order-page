/**
 * Formata uma data ISO string para o formato "YYYY-MM-DD at HH:MM:SS"
 * @param dateTime - String de data no formato ISO (ex: "2020-04-16T15:32:55.382Z")
 * @returns String formatada (ex: "2020-04-16 at 15:32:55")
 */
export function useFormatData(dateTime: string): string {
  const date = new Date(dateTime)

  if (isNaN(date.getTime())) {
    throw new Error('Data inválida')
  }

  const dateFormatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const formattedDate = dateFormatter.format(date) // YYYY-MM-DD
  const formattedTime = timeFormatter.format(date) // HH:MM:SS

  return `Created at ${formattedDate} at ${formattedTime}`
}

/**
 * Formats a number into USD currency format
 * @param value - Number to be formatted
 * @returns Formatted string in USD (ex: "$1,234.56")
 */
export function useFormatUSD(value: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(value)
}
