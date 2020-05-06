'use strict';

let currentPhotos = [];
let dropDown = $('#filter');

function Photo(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

$.get('data/page-1.json', function (data) {
  data.forEach((photo) => {
    currentPhotos.push(new Photo(photo.image_url, photo.title, photo.description, photo.keyword, photo.horns));

  });
  let $photoTemp = $('#photo-template').clone();
  currentPhotos.forEach((photo) => {
    const photoTemplate = $('#photo-template').clone();
    photoTemplate.find('h2').text(photo.title);
    photoTemplate.find('p').text(photo.description);
    photoTemplate.find('img').attr('src', photo.image_url);
    $('main').append(photoTemplate);
  });
  let keyWords = [];
  currentPhotos.forEach(photo => {
    if (!keyWords.includes(photo.keyword)) {
      const dropDownEntry = $('<option></option>').attr('value', photo.keyword).text(photo.keyword);
      dropDown.append(dropDownEntry);
      keyWords.push(photo.keyword);
    }

  });
  dropDown.on('change', (event) => {
    event.preventDefault();
    $('main').empty();
    console.log(event.target.value);
    currentPhotos.forEach(photo => {
      console.log(photo.keyword === event.target.value);
      if (photo.keyword === event.target.value) {
        const photoTemplate = $photoTemp.clone();
        photoTemplate.find('h2').text(photo.title);
        photoTemplate.find('p').text(photo.description);
        photoTemplate.find('img').attr('src', photo.image_url);
        $('main').append(photoTemplate);
      }
    });
  });
});

// get the select element by id 'filter'
// create an option element with the value keyword
// add an event that selects the element
// clear innerhtml of main
// foreach loop on the current photos
// creates and appends phototemplate for photos that match keyword and renders them






