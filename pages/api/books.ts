// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isNotionClientError, NotionClientError } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion } from '@src/sdks/notion'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data?: {
    response: QueryDatabaseResponse
  },
  error?: NotionClientError
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await notion.databases.query({ database_id: '25e2cab0cb594937b9a71dfbf7cce46d' })
    res.json({ data: { response } })
  } catch (error) {
    // https://github.com/makenotion/notion-sdk-js#typescript
    if (isNotionClientError(error)) {
      res.status(400).send({ error })
    }
  }
}
