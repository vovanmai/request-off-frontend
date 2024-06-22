'use server'
import { cookies } from 'next/headers'

export async function get() {
  return 'message from server'
}

export async function create() {
  cookies().set('name', 'lee')
}