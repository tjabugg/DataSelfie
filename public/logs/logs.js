getData();
async function getData() {
  const response = await fetch('/api'); //from the client, make a get request to a rout on the server
  const data = await response.json(); //and have that rout return all the data from the database

  for (item of data) { //each element of the array is in 'item'
    //make a div for each  datapoint, and put them in a container called root
    const root = document.createElement('p'); //this is will hold all the pieces of data in item
    const vibe = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');

    //fill in the text content
    vibe.textContent = `vibe: ${item.vibe}`; //grab data from item variable
    geo.textContent = `${item.lat}°, ${item.lon}°`; 
    const dateString = new Date(item.timestamp).toLocaleString(); //taking the timestamp and converting it to a legible data 
    date.textContent = dateString; 
    image.src = item.image64; //this is the base64 data in the database item in the image element source attribute
    image.alt = "Image  of Thomas Bugg" //every time you have an image on a webpage, it should have an alt text description for a screen reader

    //append them to the page
    root.append(vibe, geo, date, image); //append multiple elements
    document.body.append(root);

  }
  console.log(data);

}