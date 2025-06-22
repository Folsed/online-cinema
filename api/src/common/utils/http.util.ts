import type { Response, Request } from 'express';

type FetchResponse = globalThis.Response;

export function pickAuthHeaders(req: Request): Headers {
    const headers = new Headers();

    if (req.headers.cookie) headers.set('cookie', req.headers.cookie);
    if (req.headers.authorization) headers.set('authorization', req.headers.authorization);

    return headers;
}

export function forwardCookies(from: FetchResponse, to: Response) {
    const cookies = from.headers.getSetCookie?.() ?? from.headers.get?.('set-cookie');

    if (cookies) to.setHeader('set-cookie', cookies);
}
