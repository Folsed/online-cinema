import type { Response as ExpressResponse, Request } from 'express';

type FetchResponse = globalThis.Response;

export function pickAuthHeaders(req: Request): Headers {
    const h = new Headers();

    if (req.headers.cookie) h.set('cookie', req.headers.cookie);
    if (req.headers.authorization) h.set('authorization', req.headers.authorization);

    return h;
}

export function forwardCookies(from: FetchResponse, to: ExpressResponse) {
    const cookies = (from.headers as any).getSetCookie?.() ?? from.headers.get?.('set-cookie');

    if (cookies) to.setHeader('set-cookie', cookies);
}
