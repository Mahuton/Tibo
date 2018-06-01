var tmdbclient = require('themoviedbclient');//The data base movie module
var express = require('express')
var Twit = require('twit');
var TwitterBot = require('node-twitterbot').TwitterBot;
var movie_id = '',
    movie_title = '',
    link = '',
    urlTab = [],
    tweetedTab = [];
let url = 'https://www.themoviedb.org/movie/';
//Instanciation
var tmdb = new tmdbclient("7c690d1f9c2f7f69a69588ec8094e39a");
  tmdb.call("/movie/upcoming", {})
    .then(function (data) {
      for( var property in data ){
        //console.log( x );
        for( var elt in data[property] ){
          if (typeof data[property][elt].id != 'undefined') {
            movie_id = data[property][elt].id;
            movie_title = data[property][elt].title;
            movie_title = movie_title.replace(/ /g, '-').replace(/'/g, '').replace(/,/g, '').toLowerCase();
            link = url + movie_id + '-' + movie_title;
            //console.log( movie_id );
            //console.log( movie_title );
            urlTab.push( link );
          }

        }

      }
      //console.log( urlTab.length );
      var Bot = new TwitterBot({
       consumer_key: process.env.BOT_CONSUMER_KEY,
       consumer_secret: process.env.BOT_CONSUMER_SECRET,
       access_token: process.env.BOT_ACCESS_TOKEN,
       access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
      });
      var movie = urlTab[ Math.floor( Math.random() * urlTab.length ) ];
      tweetedTab.push(movie);
      console.log(tweetedTab.length);
      for (var i = 0; i <= tweetedTab.length; i++) {
        if( movie != tweetedTab[i] ){
          Bot.tweet('Hey! Here is another upcoming movie. Enjoy!' + '\n' + '@b_mahuton' + ' ' + '@themoviedb' + '\n' + movie);
          console.log('tweeted');
        }
      }
    });
