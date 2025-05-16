// pages/api/proxy/[...path].ts
import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE = 'http://195.58.37.54:8080'; // <--- вот здесь твой реальный бэк

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path?.join('/') || '';
  const targetUrl = `${API_BASE}/${path}`;

  try {
    const apiRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(API_BASE).host,
      },
      body: ['POST', 'PUT', 'PATCH'].includes(req.method || '')
        ? JSON.stringify(req.body)
        : undefined,
    });

    const contentType = apiRes.headers.get('content-type');
    res.status(apiRes.status);

    if (contentType?.includes('application/json')) {
      const json = await apiRes.json();
      res.json(json);
    } else {
      const text = await apiRes.text();
      res.send(text);
    }
  } catch (error: any) {
    console.error('Proxy error:', error);
    res.status(500).json({ message: 'Ошибка при проксировании запроса' });
  }
}