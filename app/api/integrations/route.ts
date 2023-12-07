export async function GET(request: Request) {
  const products = [{
    "id": 1, 
    "name": "Xero"
  }, {
    "id": 2, 
    "name": "MYOB"
  }]

  return Response.json({ products })
}