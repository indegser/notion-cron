// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isNotionClientError, NotionClientError } from '@notionhq/client';
import { ListUsersResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion } from '@src/sdks/notion'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data?: {
    users: ListUsersResponse
  },
  error?: NotionClientError
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const users = await notion.users.list({});
    res.json({ data: { users } })
  } catch (error) {
    // https://github.com/makenotion/notion-sdk-js#typescript
    if (isNotionClientError(error)) {
      res.status(400).send({ error })
    }
  }
}
