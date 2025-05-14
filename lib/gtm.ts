// Google Tag Manager ID
export const GTM_ID = process.env.GTM_ID || ""

// GTM dataLayer initialization
export const initDataLayer = () => {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GTM_ID}');
  `
}

// Push event to dataLayer
export const pushToDataLayer = (event: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(event)
  }
}

// Form conversion event
export const trackFormConversion = (formName: string, formData: Record<string, any> = {}) => {
  pushToDataLayer({
    event: "formSubmission",
    formName,
    formData,
  })
}

// Phone call tracking
export const trackPhoneCall = (phoneNumber: string) => {
  pushToDataLayer({
    event: "phoneCall",
    phoneNumber,
  })
}

// Page view tracking
export const trackPageView = (url: string, title: string) => {
  pushToDataLayer({
    event: "pageview",
    page: {
      url,
      title,
    },
  })
}
