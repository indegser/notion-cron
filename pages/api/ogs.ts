import ogs from 'open-graph-scraper'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data?: {
    title: string,
    description: string
    image: string,
    favicon: string,
  },
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = req.query.url?.toString();

  if (!url) {
    return res.status(400).end();
  }

  
  const { result } = await ogs({ url });
  if (!result.success) {
    return res.status(400).json({ error: result.error })
  }

  const { ogTitle, ogDescription, ogImage, favicon } = result;

  res.json({ data: {
    title: ogTitle ?? '',
    description: ogDescription ?? '',
    /** @todo ogImage parser */
    image: Array.isArray(ogImage) ? ogImage[0] : ogImage ?? '',
    favicon: favicon ?? '',
  } })
}
