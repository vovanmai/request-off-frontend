'use server'

import { cookies } from 'next/headers'

export async function setAccessTokenToServer(accessToken: string) {
  const data: any = {
    name: 'access_token',
    value: accessToken,
    httpOnly: true,
    path: '/',
  }
  cookies().set(data)
}