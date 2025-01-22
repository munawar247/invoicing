export function amountToWords(amount: number): string {
  function convert(num: any): any {
    const ones = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine'
    ];
    const teens = [
      '',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen'
    ];
    const tens = [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety'
    ];

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + ' ' + ones[num % 10];
    if (num < 1000)
      return ones[Math.floor(num / 100)] + ' Hundred ' + convert(num % 100);
    if (num < 1000000)
      return (
        convert(Math.floor(num / 1000)) + ' Thousand ' + convert(num % 1000)
      );
    if (num < 1000000000)
      return (
        convert(Math.floor(num / 1000000)) +
        ' Million ' +
        convert(num % 1000000)
      );
    return 'Overflow';
  }

  const dollars = Math.floor(amount);
  const cents = Math.round((amount - dollars) * 100);

  let result = '';

  if (dollars > 0) {
    result += convert(dollars) + 'US dollar';
    if (dollars !== 1) result += 's'; // Pluralize if necessary
  }

  if (cents > 0) {
    if (dollars > 0) result += ' and ';
    result += convert(cents) + ' cent';
    if (cents !== 1) result += 's'; // Pluralize if necessary
  }

  return (result += ' only.');
}
