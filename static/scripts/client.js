'use strict';

const tableCr = elementCreator('TABLE');
const tdCr = elementCreator('TD');
const trCr = elementCreator('TR');
const thCr = elementCreator('TH');
const tbodyCr = elementCreator('TBODY');
const theadCr = elementCreator('THEAD');
const tfootCr = elementCreator('TFOOT');
const buttonCr = elementCreator('BUTTON');
const inputCr = elementCreator('INPUT');
const labelCr = elementCreator('LABEL');
const brCr = elementCreator('BR');

const tableCreator = (thNamesArr) => {
  const table = tableCr();
  const thead = theadCr();
  const tbody = tbodyCr();
  const tfoot = tfootCr();
  const tr = trCr();
  for (let i = 0; i < thNamesArr.length; i++) {
    const th = thCr();
    th.textContent = thNamesArr[i];
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(tfoot);
  const addRow = (tdNamesArr) => {
    if(tdNamesArr.length !== thNamesArr.length) {
      console.log(`tdNamesArr.length = ${tdNamesArr.length}  mast bee === thNamesArr = ${thNamesArr.length}`);
      return;
    }
    const tr = trCr();
    for (let i = 0; i < tdNamesArr.length; i++) {
      const td = tdCr();
      td.textContent = tdNamesArr[i];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  };
  const deleteRow = (rowNumber) => {
    const num = Number(rowNumber);
    if(table.rows.length > 1 && Number.isInteger(num) && num < table.rows.length) {
      if(num === 0) {
          console.log(num);
      } else {
        table.deleteRow(num);
      }
    }
  };
  return { table, addRow, deleteRow };
};

const { table, addRow, deleteRow } = tableCreator(['column1', 'column2', 'column3']);
const body = document.querySelector('body');

const addRowButton = buttonCr('addRow');
const deleteRowButton = buttonCr('deleteRow');
const rowDeletLabel = labelCr('inter row number');
const rowNumberInput = inputCr();

const clumn1Label = labelCr('column1');
const clumn2Label = labelCr('column2');
const clumn3Label = labelCr('column3');
const column1Input = inputCr();
const column2Input = inputCr();
const column3Input = inputCr();

addRowButton.onclick = () => {
  addRow([column1Input.value, column2Input.value, column3Input.value]);
  column1Input.value = '';
  column2Input.value = '';
  column3Input.value = '';
}
deleteRowButton.onclick = () => {
  //console.log(rowNumberInput.value);
  deleteRow(rowNumberInput.value);
  rowNumberInput.value = '';
}
body.appendChild(rowDeletLabel);
body.appendChild(rowNumberInput);
body.appendChild(deleteRowButton);
body.appendChild(brCr());
body.appendChild(clumn1Label);
body.appendChild(clumn2Label);
body.appendChild(clumn3Label);
body.appendChild(brCr());
body.appendChild(column1Input);
body.appendChild(column2Input);
body.appendChild(column3Input);
body.appendChild(addRowButton);
body.appendChild(brCr());
body.appendChild(table);