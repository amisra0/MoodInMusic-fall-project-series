
import React, { useEffect , useState} from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Card from "./Card"
import './Dashboard.css';
 


// Setting the spotifyApi, so that we can use it's functions
const spotifyApi = new SpotifyWebApi({
  clientId: "", // PUT YOUR CLIENT ID IN THE QUOTES
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  console.log("This is the access token " + accessToken);
  const [artistsList, setArtistsList] = useState([]);
  const [artistsList2, setArtistsList2] = useState([]);
  const [artistsList3, setArtistsList3] = useState([]);

  const [tracksList, setTracksList] = useState([]);
  const [tracksList2, setTracksList2] = useState([]);
  const [tracksList3, setTracksList3] = useState([]);

  var [danceAverage, setdanceAverage] = useState();
  var [danceAverage2, setdanceAverage2] = useState();
  var [danceAverage3, setdanceAverage3] = useState();

  var [energyAverage, setEnergyAverage] = useState();
  var [energyAverage2, setEnergyAverage2] = useState();
  var [energyAverage3, setEnergyAverage3] = useState();

  var [valenceAverage, setValenceAverage] = useState();
  var [valenceAverage2, setValenceAverage2] = useState();
  var [valenceAverage3, setValenceAverage3] = useState();


  useEffect(() => {
    var dance_sum = 0;
    var energy_sum = 0;
    var valence_sum = 0;
    var num_tracks = 0.00001;
    if (!accessToken) return;

    // Setting Up the spotifyApi with AccessToken so that we can use its functions anywhere in the component without setting AccessToken value again & again. 
    spotifyApi.setAccessToken(accessToken);

    
    // Get the authenticated user
   

    /* Get a User’s Top Artists Short Term*/
    spotifyApi.getMyTopArtists({time_range:'short_term'})
    .then(function(data) {
    let topArtists = data.body.items;
    try{
    setArtistsList([{name: topArtists[0].name, pic: topArtists[0].images[0].url, url: topArtists[0].external_urls.spotify}, 
      {name: topArtists[1].name, pic: topArtists[1].images[0].url, url: topArtists[1].external_urls.spotify},
      {name: topArtists[2].name, pic: topArtists[2].images[0].url, url: topArtists[2].external_urls.spotify}]);


}
    catch(error){}
    }, function(err) {
    console.log('Something went wrong!', err);
    });

    /* Get a User’s Top Artists Medium Term*/
    spotifyApi.getMyTopArtists({time_range:'medium_term'})
    .then(function(data) {
    let topArtists = data.body.items;
    console.log(topArtists);
    try{
    setArtistsList2([{name: topArtists[0].name, pic: topArtists[0].images[0].url, url: topArtists[0].external_urls.spotify}, 
      {name: topArtists[1].name, pic: topArtists[1].images[0].url, url: topArtists[1].external_urls.spotify},
      {name: topArtists[2].name, pic: topArtists[2].images[0].url, url: topArtists[2].external_urls.spotify}]);
}
    catch(error){}
    }, function(err) {
    console.log('Something went wrong!', err);
    });   

    /* Get a User’s Top Artists Long Term*/
    spotifyApi.getMyTopArtists({time_range:'long_term'})
    .then(function(data) {
    let topArtists = data.body.items;
    console.log(topArtists);
    try{
    setArtistsList3([{name: topArtists[0].name, pic: topArtists[0].images[0].url, url: topArtists[0].external_urls.spotify}, 
                     {name: topArtists[1].name, pic: topArtists[1].images[0].url, url: topArtists[1].external_urls.spotify},
                     {name: topArtists[2].name, pic: topArtists[2].images[0].url, url: topArtists[2].external_urls.spotify}]);
    
    
                    }
    catch(error){}
    }, function(err) {
    console.log('Something went wrong!', err);
    });   

    /* Get a User’s Top Tracks short term*/
    spotifyApi.getMyTopTracks({time_range:'short_term'})
    .then(function(data) {
    let topTracks = data.body.items;
    console.log(topTracks);
    try{
      setTracksList([
        {name: topTracks[0].name, pic: topTracks[0].album.images[0].url, url: topTracks[0].album.external_urls.spotify, artist: topTracks[0].artists[0].name}, 
        {name: topTracks[1].name, pic: topTracks[1].album.images[0].url, url: topTracks[1].album.external_urls.spotify, artist: topTracks[1].artists[0].name}, 
        {name: topTracks[2].name, pic: topTracks[2].album.images[0].url, url: topTracks[2].album.external_urls.spotify, artist: topTracks[2].artists[0].name}, 
        {name: topTracks[3].name, pic: topTracks[3].album.images[0].url, url: topTracks[3].album.external_urls.spotify, artist: topTracks[3].artists[0].name},
        {name: topTracks[4].name, pic: topTracks[4].album.images[0].url, url: topTracks[4].album.external_urls.spotify, artist: topTracks[4].artists[0].name},
        {name: topTracks[5].name, pic: topTracks[5].album.images[0].url, url: topTracks[5].album.external_urls.spotify, artist: topTracks[5].artists[0].name}]);
        valence_sum = 0; dance_sum = 0; // initialize both to zero before looping through a new array, get a clean slate from previous values

        topTracks.map(item =>
          /* Get Audio Features for a Track */
          spotifyApi.getAudioFeaturesForTrack(item.id)
            .then(function(data) {
              console.log(data.body);
              num_tracks = num_tracks + 1;
              
              valence_sum = data.body.valence + valence_sum;
              dance_sum = data.body.danceability + dance_sum;
              energy_sum = data.body.energy + energy_sum;

              setdanceAverage(Math.round((dance_sum / num_tracks)*100));
              setEnergyAverage(Math.round((energy_sum / num_tracks)*100));
              setValenceAverage(Math.round((valence_sum / num_tracks)*100));

   
            }, function(err) {
            }));
        

    }catch(error){
      //empty
    }          
    }, function(err) {
    console.log('Something went wrong!', err);
    });


    /* Get a User’s Top Tracks medium term*/
    spotifyApi.getMyTopTracks({time_range:'medium_term'})
    .then(function(data) {
    let topTracks = data.body.items;
    console.log(topTracks);
    try{
      setTracksList2([
        {name: topTracks[0].name, pic: topTracks[0].album.images[0].url, url: topTracks[0].album.external_urls.spotify, artist: topTracks[0].artists[0].name}, 
        {name: topTracks[1].name, pic: topTracks[1].album.images[0].url, url: topTracks[1].album.external_urls.spotify, artist: topTracks[1].artists[0].name}, 
        {name: topTracks[2].name, pic: topTracks[2].album.images[0].url, url: topTracks[2].album.external_urls.spotify, artist: topTracks[2].artists[0].name}, 
        {name: topTracks[3].name, pic: topTracks[3].album.images[0].url, url: topTracks[3].album.external_urls.spotify, artist: topTracks[3].artists[0].name},
        {name: topTracks[4].name, pic: topTracks[4].album.images[0].url, url: topTracks[4].album.external_urls.spotify, artist: topTracks[4].artists[0].name},
        {name: topTracks[5].name, pic: topTracks[5].album.images[0].url, url: topTracks[5].album.external_urls.spotify, artist: topTracks[5].artists[0].name}]);
        valence_sum = 0; dance_sum = 0; energy_sum = 0; num_tracks = 0.00001// initialize both to zero before looping through a new array
        topTracks.map(item =>
          /* Get Audio Features for a Track */
          spotifyApi.getAudioFeaturesForTrack(item.id)
            .then(function(data) {
              console.log(data.body);
              num_tracks = num_tracks + 1;

              valence_sum = data.body.valence + valence_sum;
              dance_sum = data.body.danceability + dance_sum;
              energy_sum = data.body.energy + energy_sum;

              setdanceAverage2(Math.round((dance_sum / num_tracks)*100));
              setEnergyAverage2(Math.round((energy_sum / num_tracks)*100));
              setValenceAverage2(Math.round((valence_sum / num_tracks)*100));

   
            }, function(err) {
            }));
      }catch(error){
      //empty
    }
    }, function(err) {
    console.log('Something went wrong!', err);
    });
  
      /* Get a User’s Top Tracks long term*/
      spotifyApi.getMyTopTracks({time_range:'long_term'})
      .then(function(data) {
      let topTracks = data.body.items;
      console.log(topTracks);
      try{
        setTracksList3([
          {name: topTracks[0].name, pic: topTracks[0].album.images[0].url, url: topTracks[0].album.external_urls.spotify, artist: topTracks[0].artists[0].name}, 
          {name: topTracks[1].name, pic: topTracks[1].album.images[0].url, url: topTracks[1].album.external_urls.spotify, artist: topTracks[1].artists[0].name}, 
          {name: topTracks[2].name, pic: topTracks[2].album.images[0].url, url: topTracks[2].album.external_urls.spotify, artist: topTracks[2].artists[0].name}, 
          {name: topTracks[3].name, pic: topTracks[3].album.images[0].url, url: topTracks[3].album.external_urls.spotify, artist: topTracks[3].artists[0].name},
          {name: topTracks[4].name, pic: topTracks[4].album.images[0].url, url: topTracks[4].album.external_urls.spotify, artist: topTracks[4].artists[0].name},
          {name: topTracks[5].name, pic: topTracks[5].album.images[0].url, url: topTracks[5].album.external_urls.spotify, artist: topTracks[5].artists[0].name}]);
          valence_sum = 0; dance_sum = 0; energy_sum = 0; num_tracks = 0.00001// initialize both to zero before looping through a new array
          topTracks.map(item =>
            /* Get Audio Features for a Track */
            spotifyApi.getAudioFeaturesForTrack(item.id)
              .then(function(data) {
                console.log(data.body);
                num_tracks = num_tracks+1;
            
                valence_sum = data.body.valence + valence_sum;
                dance_sum = data.body.danceability + dance_sum;
                energy_sum = data.body.energy + energy_sum;

              setdanceAverage3(Math.round((dance_sum / num_tracks)*100));
              setEnergyAverage3(Math.round((energy_sum / num_tracks)*100));
              setValenceAverage3(Math.round((valence_sum / num_tracks)*100));
  
     
              }, function(err) {
              }));
      }catch(error){
        //empty
      }
      }, function(err) {
      console.log('Something went wrong!', err);
      });
      

  }, [accessToken]);

  return (
    <div className="container" style={{display: "flex", zIndex: "-1", justifyContent: "center", fontFamily: "Montserrat"}}>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap');
      </style>
        <h1>Welcome to: </h1>
        <div className = "break"></div>
        <h1 className = "animationRight">Your Mood In Music</h1>
        <div className = "break"></div>
        <h1 className = "animationLeft">See your top Spotify tracks over multiple ranges of time and their audio features, as well as what they ultimately reveal about your mood.</h1>
        <div className = "break"></div>

        {/*   ----------------------------------4 WEEKS SHORT TERM MUSIC INTO------------------------------- */}

        <div className = "linebreak"> </div>

        <div className = "break"></div>
        <p style = {{fontSize: "60px"}}><center>The Last <strong>4 Weeks</strong></center></p>
        <div className = "break"></div>
        <p>On a scale of 1-10, these are how your last 4 weeks' top tracks rank in:</p>

<ul className = "shortTerm">
    <li>     Danceability - {danceAverage/10}        <span className = "addedMessage">{danceAverage > 60 ? 'You are pretty groovy!' : 'You could use some more grooviness in your life'}</span></li>
    <li>     Energy - {energyAverage/10}      <span className = "addedMessage">{energyAverage > 60 ? 'Your music these last 4 weeks has been pretty loud and fast-paced.' : 'Your music these last 4 weeks has been on the quiet, slower side'}</span></li>
    <li>     Mood - {valenceAverage/10}       <span className = "addedMessage">{valenceAverage >= 60 ? 'Seems like these you have been happy these last 4 weeks!' : 'Your top tracks show a pretty low mood... you doing alright?'}</span></li>
</ul>
<div className = "break"></div> 
        <h2>Your Last 4 Weeks' Top Tracks</h2>
        <div className = "break"></div>
        {tracksList.map((track) => (<h3 key = {track.name}> 
        <Card image = {track.pic} title = {track.name} url = {track.url} desc = {track.artist}/>
        </h3>))}
        <div className = "break"></div>
        <h2><center>Your Last 4 Weeks' Top Artists</center></h2>
        <div className = "break"></div>
        {artistsList.map((artist) => (<h3 key = {artist.name}>
        <Card image = {artist.pic} title = {artist.name} url = {artist.url}/>
        </h3>))}
        <div className = "break"></div>
        
        

        {/*----------------------------------6 MONTHS MEDIUM TERM MUSIC INTO------------------------------- */}


        <div className = "linebreak2"> </div><div className = "break"></div>

        <p style = {{fontSize: "60px"}}><center>The Last <strong>6 Months</strong></center></p>


        <div className = "break"></div>
        <p>On a scale of 1-10, these are how your last 6 months' top tracks rank in:</p>
        <ul className = "shortTerm">
            <li>     Danceability - {danceAverage2/10}       <span className = "addedMessage">{danceAverage2 >= 60 ? 'Impressive, you\'ve been getting your groove on for 6 months.' : 'Come on man, throw in some Doja Cat in there or something, dance a little'}</span></li>
            <li>     Energy - {energyAverage2/10}        <span className = "addedMessage">{energyAverage2 >= 60 ? 'Tracks this energetic streamed this much these 6 months? You\'re unstoppable!' : 'You\'ve got some soft tracks on repeat these last 6 months'}</span></li>
            <li>     Mood - {valenceAverage2/10}       <span className = "addedMessage">{valenceAverage2 >= 60 ? 'Judging by that mood, sounds like these last 6 months have been going well for you!' : 'Oof, looks like these last 6 months have been rough on you.'}</span></li>
        </ul>
        <div className = "break"></div> 

        <h2>Your Last 6 Months' Top Tracks</h2>
        <div className = "break"></div>
        {tracksList2.map((track) => (<h3 key = {track.name}> 
        <Card image = {track.pic} title = {track.name} url = {track.url} desc = {track.artist}/>
        </h3>))}
        <div className = "break"></div>

        <h2><center>Your Last 6 Months' Top Artists</center></h2>
        <div className = "break"></div>
        {artistsList2.map((artist) => (<h3 key = {artist.name}> 
        <Card image = {artist.pic} title = {artist.name} url = {artist.url}/>
        </h3>))}
        <div className = "break"></div>

        


        {/*----------------------------------ALL TIME MUSIC INTO------------------------------- */}
        <div className = "linebreak3"> </div>        <div className = "break"></div>



        <p style = {{fontSize: "60px"}}><center>The <strong>All-Time</strong></center></p>
        <div className = "break"></div>
        <p>On a scale of 1-10, these are how your all-time top tracks rank in:</p>
        <ul className = "shortTerm">
            <li>     Danceability - {danceAverage3/10} <span className = "addedMessage">{danceAverage3 >= 60 ? 'You\'ve have streamed some very danceable tracks, love to see it' : 'Well, I hope you add some more bangers into your playlist soon.'}</span></li>
            <li>     Energy - {energyAverage3/10}        <span className = "addedMessage">{energyAverage3 >= 60 ? 'Duracell should just call you to get energy from their batteries' : 'You must be a very chill, mellow person'}</span></li>
            <li>     Mood - {valenceAverage3/10}       <span className = "addedMessage">{valenceAverage3 >= 60 ? 'Based on your all-time top tracks, it \'sounds\' like you\'re having a good time! (Or at least you are when you\'re on Spotify!)' : 'I hope nobody passes you the aux, because it seems like your music would just depress everyone'}</span></li>
        </ul>
        <div className = "break"></div>

        <h2><center>Your All-Time Top Tracks</center></h2>
        <div className = "break"></div>
        {tracksList3.map((track) => (<h3 key = {track.name}> 
        <Card image = {track.pic} title = {track.name} url = {track.url} desc = {track.artist}/>
        </h3>))}
        <div className = "break"></div>
        

        <h2><center>Your All-Time Top Artists</center></h2>
        <div className = "break"></div>
        {artistsList3.map((artist) => (<h3 key = {artist.name}> 
        <Card image = {artist.pic} title = {artist.name} url = {artist.url}/>
        </h3>))}
        <div className = "break"></div>

        
    </div>
  );
};

export default Dashboard;
