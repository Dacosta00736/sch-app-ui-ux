
// ====== Utility function ======
// for getting element by its id attr.
let id = ele => document.getElementById(ele);

// for getting element with css query selector
let domQuery = (ele, cssQuery) => {
  return ele.querySelector(cssQuery);
}
// ====== **************** ======

// Quill toolbar modules
var bars = [
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'sup'}],
  [{'indent': '-1'}, {'indent': '+1'}],
  [{'direction': 'rtl'}],
  [{'color': []}, {'background': []}],
  ['link', 'image', 'video', 'formula'],
  [{'font': []}],
  [{'align': []}]
];

// Initialize Quill editor
var quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Compose Lesson Note!...',
  modules: {
    toolbar: bars
  }
});

// adding page(s) of lesson note
function addNotePage() {
  let db = (localStorage.note == null) ? [] : JSON.parse(localStorage.note);
  let page = quill.getContents();

  // Add & Save to localStorage API
  db.push(page);
  localStorage.setItem('note', JSON.stringify(db));

  // Display total pages Added
  id('pageAdded').innerHTML = JSON.parse(localStorage.note).length;

  // clear text field for new texts
  quill.setContents();
}

id('addPage').addEventListener('click', addNotePage);

// ====== **************** ======

// previewing lesson note
function previewPage() {
  // Display the first page added in localStorage API within the text-field
  let pages = JSON.parse(localStorage.note);
  quill.setContents(pages[0]);

  // Display added pages and page count elements respectively
  id('pageTotal').innerHTML = pages.length;
  id('pageCount').innerHTML = 1;

  // Display the pagination panel & hide the functional buttons sections
  id('pageAddedSection').style.display = 'none';
  id('pageCounterSection').style.display = 'block';
}

/* Paginating records from localStorage functions */
function paginateNote(n) {
  let pages = parseInt(id('pageTotal').innerHTML);
  let pageCount = parseInt(id('pageCount').innerHTML);
  let page = JSON.parse(localStorage.note);
  let inc = pageCount + (n);
  if (pageCount > 1) {
     id('paginatePrev').parentElement.classList.remove('disabled');
  }else {
    id('paginatePrev').parentElement.classList.add('disabled');
  }

  if ( inc == (pages - 1) ) {
    id('pageCount').innerHTML = pages;
    id('paginateNext').parentElement.classList.add('disabled');
  }else {
    id('paginateNext').parentElement.classList.remove('disabled');
  }

  console.log(inc + n);
  id('pageCount').innerHTML = pageCount + n;
  /*
   // check to see if total added page count exceeds
     if ( pageCount === (pages - 1) ) {
     id('pageCount').innerHTML = pages;
     id('paginateNext').parentElement.classList.add('disabled');
   }

   // remove 'disabled' class from the perv btn parent
   if (pageCount >= 1) {
     id('paginatePrev').parentElement.classList.remove('disabled');
   }

   // increment page count and display relative page to such increment (Note: iss an array index)
   let inc = pageCount;
   quill.setContents(page[inc]);
   id('pageCount').innerHTML = (pageCount + 1);
   */
}

/* Handler for previewing added pages */
id('previewPages').addEventListener('click', previewPage);

/* for pagination */
// next pagination btn
// id('paginateNext').addEventListener('click', );

// prev pagination button
// id('paginatePrev').addEventListener('click', paginateNote);
// ====== **************** ======

// saving lesson note
function saveNote() {
  console.log('Note saved!');
}

id('saveLessonNote').addEventListener('click', saveNote);

// ====== **************** ======

// clear Note field
id('clearTextField').addEventListener('click', () => {
  let confrm = confirm("Are you sure, you want to clear the text field");
  if (confrm) {
    quill.setContents();
  }
});
