import { BusinessDetailsSchema } from './business-details';

describe('Business Details Schema Tests', () => {
  it('should accept valid business details', () => {
    const validBusinessDetails = {
      name: 'Test Business',
      yearEstablished: 2010,
      loanAmount: 50000
    };
    expect(BusinessDetailsSchema.parse(validBusinessDetails)).toEqual(validBusinessDetails);
  });

  it('should reject business details with empty name', () => {
    const invalidBusinessDetails = {
      name: '',
      yearEstablished: 2010,
      loanAmount: 50000
    };
    expect(() => BusinessDetailsSchema.parse(invalidBusinessDetails)).toThrow("Business name is required.");
  });

  it('should reject business details with year established before 1900', () => {
    const invalidBusinessDetails = {
      name: 'Test Business',
      yearEstablished: 1899,
      loanAmount: 50000
    };
    expect(() => BusinessDetailsSchema.parse(invalidBusinessDetails)).toThrow("Year must be after 1900.");
  });

  it('should reject business details with year established in the future', () => {
    const futureYear = new Date().getFullYear() + 1;
    const invalidBusinessDetails = {
      name: 'Test Business',
      yearEstablished: futureYear,
      loanAmount: 50000
    };
    expect(() => BusinessDetailsSchema.parse(invalidBusinessDetails)).toThrow("Year cannot be in the future.");
  });

  it('should reject business details with negative loan amount', () => {
    const invalidBusinessDetails = {
      name: 'Test Business',
      yearEstablished: 2010,
      loanAmount: -1000
    };
    expect(() => BusinessDetailsSchema.parse(invalidBusinessDetails)).toThrow("Loan amount must be positive.");
  });
});
