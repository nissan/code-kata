import { GET } from './route'; // Adjust the import path as necessary

describe('/api/integrations', () => {
  it('should return a list of products', async () => {
    
    // Call your GET function
    const response = await GET();

    // Parse the response (if necessary)
    const data = await response.json();

    // Check if the response is as expected
    expect(data).toEqual({
      products: [
        { id: 1, name: "xero", description: "Xero" },
        { id: 2, name: "myob", description: "MYOB" }
      ]
    });
  });

});