import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

let numbersOfItems: number[] = [];

function getPreperedItems(tools: string[], val: number, page: number) {
  const startIndex = val * (page - 1);
  let endIndex = startIndex + val;

  if (endIndex > items.length) {
    endIndex = items.length;
  }

  const preperedItems = tools.slice(startIndex, endIndex);

  numbersOfItems = [startIndex + 1, endIndex];

  return preperedItems;
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setPageChange] = useState(1);
  const visibleItems = getPreperedItems(items, perPage, currentPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${numbersOfItems[0]} - ${numbersOfItems[1]} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => [setPerPage(+e.target.value), setPageChange(1)]}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setPageChange}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
