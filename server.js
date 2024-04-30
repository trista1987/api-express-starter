import express from "express";
import cors from "cors";
import albumsData from "./data/album.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 7070;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
//http://localhost:7070/
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

//get all albums
//http://localhost:7070/albums
app.get("/albums", (req, res) => {
  res.json(albumsData)
})

//get one album based on id
//http://localhost:7070/albums/2
//albumId: '2' => string. album.id => number. (+albumId === album.id) => turn string into a number
app.get("/albums/:albumId", (req, res) => {
  const {albumId} = req.params
  const album = albumsData.find(album => +albumId === album.id)

  // console.log(req.params)
  if(album){
    res.json(album)
  } else {
    res.status(404).send('album is not found')
  }
  
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
