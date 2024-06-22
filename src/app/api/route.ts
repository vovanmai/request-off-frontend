export async function GET() {
  return Response.json({ message: 'OK' }, {
    headers: {
      'Set-Cookie': 'name=vovanmai99999'
    }
  })
}