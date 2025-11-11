import AttributeTable from './attributetable';
import './attribute-table.css';

const products = Array.from({ length: 20 }, (_, i) => `Product ${i + 1}`);
const attributes = Array.from({ length: 25 }, (_, i) => ({
  title: `Attribute ${i + 1}`,
  values: Array.from({ length: 20 }, (_, j) => `Value ${i + 1}-${j + 1}`),
}));

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Comparison</h1>
      <p>
        This table demonstrates horizontal and vertical scrolling with a sticky
        attribute column and a sticky header row.
      </p>
      <AttributeTable products={products} attributes={attributes} />
    </div>
  );
}

export default App;
