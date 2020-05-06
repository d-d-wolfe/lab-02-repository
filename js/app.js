'use strict';

let currentPhotos = [];

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

  currentPhotos.forEach((photo) => {
    const photoTemplate = $('#photo-template').clone();
    photoTemplate.find('h2').text(photo.title);
    photoTemplate.find('p').text(photo.description);
    photoTemplate.find('img').attr('src', photo.image_url);
    $('main').append(photoTemplate);
  });

});


