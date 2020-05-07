function setup() {
        noCanvas();
        const video = createCapture(VIDEO);
        video.size(800, 600);
        
        let lat, lon;
        const button = document.getElementById('submit');
        button.addEventListener('click', async event => { 
        //when the user presses the button, grab the lat, lon, vibe > post to server
        const vibe = document.getElementById('vibe').value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();//convert video to Base64 and putting it in 'image'
        const data = {lat, lon, vibe, image64}; //get data, put it in an object, package it as a post
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) //body of the post request is where I'm packaging my data 

        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
      });

        if('geolocation' in navigator) { 
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition( async position =>{
        //call this callback, pass in position and console.log it
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);
        //retrieve the latitude and longitude
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;
        });
      }else{
        console.log('geolocation not available');
      }
    }