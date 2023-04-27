import { FormatToCurrencyHUFPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatToCurrencyHUFPipe();
    expect(pipe).toBeTruthy();
  });
});
