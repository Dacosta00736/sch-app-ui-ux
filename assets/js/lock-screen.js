// ==== Utility functions ====
// get an element by its id attr.
let id = ele => document.getElementById(ele);

// get an element by css query selector
let domQuery = (ele, cssQuery) => {
  return ele.querySelector(cssQuery);
};

// ============ ***** ============

// Displays the lock Screen
function lockScreen() {
  let btn = id('lockScreenBtn');
  let screen = domQuery(document, '.lock-screen');
  screen.style.display = 'block';
}

// hides the lock Screen
function unlock(e) {
  // prevents Default form submission behaviour
  e.preventDefault();

  // note: check if password matches user's password

  // just testing if password field is not empty on submission (for testing)
  let pwd = domQuery(document, '[name=lockPwd]').value;
  if(pwd != '') {
    // hide the lockscreen
    let screen = domQuery(document, '.lock-screen');
    screen.classList.add('unlock');
    setTimeout(() => {
      screen.style.display = 'none';
      screen.classList.remove('unlock');
    }, 500);

    // reset the form field
    this.reset();
  }
}

id('lockScreenBtn').addEventListener('click', lockScreen);

id('lockScreenFrm').addEventListener('submit', unlock);
