'use strict';

require('dotenv').config();

const awspublish = require('gulp-awspublish');
const gulp = require('gulp');
const parallelize = require("concurrent-transform");

gulp.task('publish', () => {
  const publisher = awspublish.create({
    region: process.env.S3_REGION,
    params: {
      Bucket: process.env.S3_BUCKET
    }
  });

  // define custom headers
  const headers = {
    'Cache-Control': 'max-age=0, no-transform, public'
  };


  return gulp.src(['./www/**'])
     // gzip, Set Content-Encoding headers and add .gz extension
    .pipe(awspublish.gzip())

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(parallelize(publisher.publish(headers), 10))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe(awspublish.reporter());

});
