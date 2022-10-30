import { isFullPage } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

const extractPageTitle = (page: PageObjectResponse | PartialPageObjectResponse) => {
  const defaultTitle = '무제'

  if (!isFullPage(page)) return defaultTitle;
  const titleProperty = page.properties.title;
  const title = titleProperty.type === 'title' ? titleProperty.title[0].plain_text : defaultTitle

  return title;
}

export const notionUtils = {
  extractPageTitle,
}