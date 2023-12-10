import { GET } from "./route";

describe('GET function', () => {
    it('should return a valid UUID as appId', async () => {
        const fakeRequest = {} as Request; // Mocking the Request object
        const response = await GET(fakeRequest);
        const data = await response.json();

       expect(typeof data.appId).toBe('string');
        expect(data.appId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i); // UUID regex
    });
});

