
// Actual code

import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// code goes here
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// const Google_API_key = 'AIzaSyAZlb0By-1rVEkB2DlSLSsDtOkpC6MDpJk';
// const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

// declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send 'enteredAddress' to Google's API
    axios
      .get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          enteredAddress
        )}&key=${process.env.Admin_Google_API_Key}`
      )
      .then(response => {
        // console.log(response);
        if(response.data.status !== 'OK'){
            throw new Error('Could not fetch location!');
        }
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coordinates,
            zoom: 16
        }); 

        new google.maps.Marker({ position: coordinates, map: map });
      })
      .catch((err) => {
        alert(err.message);
        console.log("Something went wrong:", err);
      });
}

form.addEventListener('submit', searchAddressHandler);
