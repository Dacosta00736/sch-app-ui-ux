// ==== Utility functions ====
// get an element by its id attr.
let id = ele => document.getElementById(ele);

// get an element by css query selector
let domQuery = (ele, cssQuery) => {
  return ele.querySelector(cssQuery);
};

export {id, domQuery}
