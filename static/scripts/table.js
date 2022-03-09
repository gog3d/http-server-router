'use strict';

const elementCreator = (tagName, attributes = {}, startId = 0) => {
  if (attributes['id'] === undefined || attributes['class'] === undefined) {
    attributes['id'] = `${tagName.toLowerCase()}_id`;
    attributes['class'] = `${tagName.toLowerCase()}-class`;
  }
  const attr = Object.assign(attributes);
  //console.log(attr);
  return (textContent) => {
    const element = document.createElement(tagName);
      for (const key in attributes) {
        if (key === 'id') {
          if(attributes[key] === undefined) {
            element.setAttribute(key, startId.toString());
          } else {
            element.setAttribute(key, startId.toString() + '_' + attributes[key].toString());
          }
        } else {
          element.setAttribute(key, attributes[key]);
        }
          //console.log(startId); 
        }
    element.textContent = textContent;
    startId++;
    return element;
  }
};

//table
//  thead
//    tr
//      th
//  tbody
//    tr
//      td
//tfoot
//    tr
//      td
