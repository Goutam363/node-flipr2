# node-flipr2

Install the dependencies by running this command-> "npm install"

To run in Development environment use this command-> "npm run dev"

To run in production environment use this command-> "npm run start"

This app has 2 post request apis

1st api:    
You can make post request at "http://localhost:3000/process/devices?name=status" or "https://goutam363-flipr2.herokuapp.com/process/devices?name=status"
where "device" is a collection name of a mongodb passed as parameter, "status" is another collection name of mongodb passed as query parameter,
also you have to pass an json array containing the url of the mongodb in the body, like this ["mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net/"]
then it will return an object having keys of device ids and corresponding arrays containing their locations from older to latest order, also send 2 custom headers with the kes "Name" and "Contact"

2nd api:    
You can make the post request at "http://localhost:3000/location" or "https://goutam363-flipr2.herokuapp.com/location"
by passing an array of address names in the body, like this ["kalyani, India","Kolkata, india","Delhi, india"] It will generate the lattitude and logitude of them, also return the result if success, with the status code 200
