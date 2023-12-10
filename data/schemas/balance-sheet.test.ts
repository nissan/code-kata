import { BalanceSheetEntrySchema } from './balance-sheet';

describe('BalanceSheetEntrySchema', () => {
  it('should accept a valid balance sheet entry', () => {
    const validEntry = {
      year: 2020,
      month: 5,
      profitOrLoss: 30000,
      assetsValue: 50000
    };
    expect(BalanceSheetEntrySchema.parse(validEntry)).toEqual(validEntry);
  });

  it('should reject an entry with an invalid month', () => {
    const invalidEntry = {
      year: 2020,
      month: 13, // Invalid month
      profitOrLoss: 30000,
      assetsValue: 50000
    };
    expect(() => BalanceSheetEntrySchema.parse(invalidEntry)).toThrow();
  });

  it('should reject an entry with a negative assets value', () => {
    const invalidEntry = {
      year: 2020,
      month: 5,
      profitOrLoss: 30000,
      assetsValue: -1000 // Negative assets value
    };
    expect(() => BalanceSheetEntrySchema.parse(invalidEntry)).toThrow("Assets value must be positive.");
  });

  it('should reject an entry with a non-numeric year', () => {
    const invalidEntry = {
      year: "2020", // Year should be a number
      month: 5,
      profitOrLoss: 30000,
      assetsValue: 50000
    };
    expect(() => BalanceSheetEntrySchema.parse(invalidEntry)).toThrow();
  });

  it('should reject an entry with a non-numeric profit or loss value', () => {
    const invalidEntry = {
      year: 2020,
      month: 5,
      profitOrLoss: "30000", // Profit or loss should be a number
      assetsValue: 50000
    };
    expect(() => BalanceSheetEntrySchema.parse(invalidEntry)).toThrow();
  });

  // Additional tests can be added as needed to cover more edge cases
});
