export async function GET() {
  const products = [{
    "id": 1, 
    "name": "xero",
    "description": "Xero"
  }, {
    "id": 2, 
    "name": "myob",
    "description": "MYOB"
  }]

  return Response.json({ products })
}