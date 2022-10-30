// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isNotionClientError, NotionClientError } from '@notionhq/client';
import { notion } from '@src/sdks/notion'
import { notionUtils } from '@src/utils/notion';
import type { NextApiRequest, NextApiResponse } from 'next'

type Book = {
  id: string
  title: string
}

type Data = {
  response?: Array<Book>
  error?: NotionClientError
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await notion.databases.query({ database_id: '6dc0fa57a6a54cad9242f6feefc22344' })
  
    const books = response.results.map((page) => ({ id: page.id, title: notionUtils.extractPageTitle(page), author: notionUtils.extractText(page, 'author') }))

    res.json({ response: books })
  } catch (error) {
    // https://github.com/makenotion/notion-sdk-js#typescript
    if (isNotionClientError(error)) {
      res.status(400).send({ error })
    }
  }
}
