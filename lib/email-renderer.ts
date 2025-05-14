"use server"

import type { ReactElement } from "react"
import { renderToString } from "react-dom/server"
import { CustomerEmailTemplate, BusinessEmailTemplate } from "@/components/EmailTemplate"
import type { CustomerEmailTemplateProps, BusinessEmailTemplateProps } from "@/types/email"

export async function renderBusinessEmail(props: BusinessEmailTemplateProps): Promise<string> {
  return renderToString(BusinessEmailTemplate(props) as ReactElement)
}

export async function renderCustomerEmail(props: CustomerEmailTemplateProps): Promise<string> {
  return renderToString(CustomerEmailTemplate(props) as ReactElement)
}
