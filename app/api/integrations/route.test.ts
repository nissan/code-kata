import { GET } from './route'; // Adjust the import path as necessary

describe('/api/integrations', () => {
  it('should return a list of products', async () => {
    // Mock the Request object
    const mockReq = {} as Request;

    // Call your GET function
    const response = await GET(mockReq);

    // Assuming your Response.json function returns a JSON object
    // Check the status code (if applicable)
    // expect(response.statusCode).toBe(200); // Uncomment if you have statusCode in your response

    // Parse the response (if necessary)
    const data = await response.json();

    // Check if the response is as expected
    expect(data).toEqual({
      products: [
        { id: 1, name: "Xero" },
        { id: 2, name: "MYOB" }
      ]
    });
  });

});