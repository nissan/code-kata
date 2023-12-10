import { BalanceSheetEntrySchema } from '../schemas/balance-sheet';
import { MYOBSheet, XeroSheet } from './balance-sheet';


describe('Validate the sample data setup meets schema rules', () => {
    describe('Validating MYOBSheet entries', () => {
        MYOBSheet.forEach((entry, index) => {
            it(`should validate entry ${index + 1} of MYOBSheet`, () => {
                expect(BalanceSheetEntrySchema.parse(entry)).toEqual(entry);
            });
        });
    });

    describe('Validating XeroSheet entries', () => {
        XeroSheet.forEach((entry, index) => {
            it(`should validate entry ${index + 1} of XeroSheet`, () => {
                expect(BalanceSheetEntrySchema.parse(entry)).toEqual(entry);
            });
        });
    });



});