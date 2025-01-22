import InvoiceFilterCard from './invoice-filtercard/invoice-filtercard';
import InvoiceData from './invoice-data/invoice-data';
import StaticDataIcon from '../common/static-data-icon';

export default function InvoiceCreation() {
  return (
    <>
      <div className="container-fluid">
        <div className="grc-card">
          <StaticDataIcon />
          <InvoiceFilterCard />
          <InvoiceData />
        </div>
      </div>
    </>
  );
}
