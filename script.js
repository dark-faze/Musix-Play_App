// Document has been loaded
$( document ).ready(function() {
    const getUrlParameter = (sParam) => {
      let sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
          sParameterName,
          i;
      console.log(sPageURL)    
      let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
      sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
      console.log(split_str)  
      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  };
  
  const accessToken = getUrlParameter('access_token');

  let client_id = 'da267bfa27f24526a2c41fc0f02ca75c';

    // let redirect_uri = "https%3A%2F%2Fmusix-play.herokuapp.com"; 
  let redirect_uri = "http%3A%2F%2F127.0.0.1%3A5500"

    const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
   
    if(accessToken == null || accessToken == "" || accessToken == undefined){
      window.location.replace(redirect);
    }

    $( "#search_button" ).click(function() {
      let raw_search_query = $('#search-text').val();
      let search_query = encodeURI(raw_search_query);
      $.ajax({
        url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        },
        success: function(data) {
          let num_of_tracks = data.tracks.items.length;
          let count = 0;
          const max_songs = 12;
          while(count < max_songs && count < num_of_tracks){
            let id = data.tracks.items[count].id;
            let src_str = `https://open.spotify.com/embed/track/${id}`;
            let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
            let parent_div = $('#song_'+ count);
            parent_div.html(iframe);
            count++;
          }
        }
      }); 
    }); 
  }); 
