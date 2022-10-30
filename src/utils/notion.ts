import { isFullPage } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

const extractPageTitle = (page: PageObjectResponse | PartialPageObjectResponse) => {
  const defaultTitle = '무제'

  if (!isFullPage(page)) return defaultTitle;
  const titleProperty = page.properties.title;
  const title = titleProperty.type === 'title' ? titleProperty.title[0].plain_text : defaultTitle

  return title;
}

const extractText = (page: PageObjectResponse | PartialPageObjectResponse, propertyKey: string) => {
  if (!isFullPage(page)) return '';

  const textProperty = page.properties[propertyKey]
  if (!textProperty || textProperty.type !== 'rich_text') {
    return ''
  }

  return textProperty.rich_text.map(richText => richText.plain_text).join(' ')
}

export const notionUtils = {
  extractText,
  extractPageTitle,
}