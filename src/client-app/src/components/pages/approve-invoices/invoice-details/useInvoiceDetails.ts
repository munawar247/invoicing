import { ChargesData } from '../../../data/data';

export default function UseInvoiceDetails() {
  const getAddressDetails = (location: any) => {
    return (
      location.address +
      ',' +
      location.city +
      ',' +
      location.state +
      ',' +
      location.zipCode +
      ',' +
      location.country
    );
  };

  const chargeDetails = () => {
    return (
      ChargesData.charge +
      ChargesData.accessorial +
      ChargesData.fuel +
      ChargesData.taxes -
      ChargesData.discount
    ).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return {
    getAddressDetails,
    chargeDetails,
    formatCurrency
  };
}
