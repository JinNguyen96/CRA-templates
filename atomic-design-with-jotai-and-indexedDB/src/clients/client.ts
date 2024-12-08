type ReadMethodInitOptions = Omit<RequestInit, 'method'>;
type WriteMethodInitOptions = Omit<ReadMethodInitOptions, 'body'>;
interface IResponse<T> {
  error_code: string | null;
  message: string | null;
  result: T;
}

const errorMessages: Record<string, string> = {}
async function wrappedFetch<T>(url: RequestInfo, inits: RequestInit = {}) {
  let initsCustom = inits;
  try {
    initsCustom = {
      ...inits,
    };
    const response = await fetch(url, { ...initsCustom });
    if (response.status === 403) {
      // TODO: handle token expired
      console.log('error', response);
    }

    const result = (await response.json()) as unknown;

    if (
      response.status === 404 ||
      response.status === 400 ||
      response.status === 460
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {...(result as any), message: errorMessages[(result as any).message] ?? (result as any).message } as Promise<{
        error_code: string | null;
        message: string | null;
        result: T;
      }>;
    }

    if (response.status === 429) {
        const message = (result as IResponse<T>)?.message ||
        `Too many requests`;
      throw new Error(message)
    }

    if (response.status !== 200) {
      const message =
        (result as IResponse<T>)?.message ||
        `Something went wrong calling ${JSON.stringify(url)}`;
      throw new Error(message);
    }

    return {...(result as IResponse<T>), message: errorMessages[(result as IResponse<T>).message ?? ''] ?? (result as IResponse<T>).message} as IResponse<T>;
  } catch (e) {
    console.error(e);
    // TODO: handle error
  }
}

export class Client {
  private jsonHeaders: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
  };
  private uploadHeaders: HeadersInit = {};

  public updateHeader(options: Record<string, string>) {
    this.jsonHeaders = {
      ...this.jsonHeaders,
      ...options
    }
  }

  public async get<T>(url: RequestInfo, inits: ReadMethodInitOptions = {}) {
    return wrappedFetch<T>(url, {
      ...inits,
      headers: {
        ...inits?.headers,
        ...this.jsonHeaders,
      },
      method: 'GET',
    });
  }

  public async post<T>(
    url: RequestInfo,
    body: unknown,
    inits: WriteMethodInitOptions = {}
  ) {
    return wrappedFetch<T>(url, {
      ...inits,
      body: JSON.stringify(body),
      headers: {
        ...inits?.headers,
        ...this.jsonHeaders,
      },
      method: 'POST',
    });
  }

  public async put(
    url: RequestInfo,
    body: unknown,
    inits: WriteMethodInitOptions = {}
  ) {
    return wrappedFetch(url, {
      ...inits,
      body: JSON.stringify(body),
      headers: {
        ...inits?.headers,
        ...this.jsonHeaders,
      },
      method: 'PUT',
    });
  }

  public async delete(
    url: RequestInfo,
    body: unknown,
    inits: ReadMethodInitOptions = {}
  ) {
    return await wrappedFetch(url, {
      body: JSON.stringify(body),
      headers: {
        ...inits?.headers,
        ...this.jsonHeaders,
      },
      ...inits,
      method: 'DELETE',
    });
  }

  public async upload(url: RequestInfo, inits: WriteMethodInitOptions = {}) {
    return wrappedFetch(url, {
      ...inits,
      headers: {
        ...inits?.headers,
        'Content-Type': 'multipart/form-data',
        ...this.uploadHeaders,
      },
      method: 'POST',
    });
  }
}

export const client = new Client();
