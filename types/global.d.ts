interface Window {
  dataLayer?: Array<{
    event: string
    [key: string]: any
  }>
  gtag: (...args: any[]) => void
}
