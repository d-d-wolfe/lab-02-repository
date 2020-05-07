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

const navigateToPage = (pageNumber) => {
  $.get('data/page-' + pageNumber + '.json', function (data) {
    dropDown.off('change');
    currentPhotos = [];
    data.forEach((photo) => {
      addToPhotos(photo);

    });

    renderPhotos();
    addKeywordsToDropdown();
    dropDown.on('change', (event) => {
      filterByKeywords(event.target.value);
    });

  });
};

$('#pages').children().on('click', (event) => {
  navigateToPage(event.target.text);
});

navigateToPage(1);

// get the select element by id 'filter'
// create an option element with the value keyword
// add an event that selects the element
// clear innerhtml of main
// foreach loop on the current photos
// creates and appends phototemplate for photos that match keyword and renders them






