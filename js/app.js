/*global Handlebars, $ */
'use strict';

let currentPhotos = [];
let dropDown = $('#filter');
const photoTemplate = Handlebars.compile($('#photo-template').html());
const keyWords = [];

function Photo(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

const addToPhotos = (photo) => {
  currentPhotos.push(new Photo(photo.image_url, photo.title, photo.description, photo.keyword, photo.horns));
};

const renderPhotos = () => {
  $('main').empty();
  currentPhotos.forEach((photo) => {
    const result = photoTemplate(photo);
    $('main').append(result);
  });
};

const addKeywordsToDropdown = () => {
  
  currentPhotos.forEach(photo => {
    if (!keyWords.includes(photo.keyword)) {
      const dropDownEntry = $('<option></option>').attr('value', photo.keyword).text(photo.keyword);
      dropDown.append(dropDownEntry);
      keyWords.push(photo.keyword);
    }

  });
};

const filterByKeywords = (keyword) => {
  event.preventDefault();
  $('main').empty();
  currentPhotos.forEach(photo => {
    if (photo.keyword === keyword) {
      const result = photoTemplate(photo);
      $('main').append(result);
    }
  });
};

const sortByTitle = (arr) => {
  arr.sort((a, b) => {
    if(a.title > b.title) {
      return 1;
    } else if(a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  })
};

const sortByHorns = (arr) => {
  arr.sort((a, b) => {
    if(a.horns > b.horns) {
      return 1;
    } else if(a.horns < b.horns) {
      return -1;
    } else {
      return 0;
    }
  })
};

const navigateToPage = (pageNumber) => {
  $.get('data/page-' + pageNumber[pageNumber.length - 1] + '.json', function (data) {
    dropDown.off('change'); // Removes change event from drop-down menu
    currentPhotos = []; // Empty out all photos

    // Adds each photo from JSON into currentPhotos array
    data.forEach((photo) => {
      addToPhotos(photo);
    });
    
    sortByTitle(currentPhotos);

    renderPhotos(); // Renders all photos in currentPhotos to HTML
    addKeywordsToDropdown();  // Adds keywords of all photos in currentPhotos to keyWords array

    // Adds change event to drop-down menu that filters all photos displayed by keyword
    dropDown.on('change', (event) => {
      filterByKeywords(event.target.value);
    });
  });
};

$('#pages').children().on('click', (event) => {
  navigateToPage(event.target.text);
});

$('#title').on('click', (event) => {
  sortByTitle(currentPhotos);
  renderPhotos();
});

$('#horns').on('click', (event) => {
  sortByHorns(currentPhotos);
  console.log(currentPhotos);
  renderPhotos();
});

navigateToPage('Page 1');  // Loads 1st page

// FEATURE 4
// 1. Sort by title on page-load
//// a. Create button with click handler to sort by title
// 2. Create button with click handler to sort by number of horns
// 3. Create sort function that responds to click event






