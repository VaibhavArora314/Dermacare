// const apiKey = 'Au9AmA3wT8iPWZzGuDOKWeh0iKRBvPbKmZkuF77PDDN2sLZ7qn6ke-cwfyOHB46B';

import axios from 'axios';

const apiKey = 'Au9AmA3wT8iPWZzGuDOKWeh0iKRBvPbKmZkuF77PDDN2sLZ7qn6ke-cwfyOHB46B';
const location = '37.7749,-122.4194'; // Replace with your coordinates (e.g., '37.7749,-122.4194')
const radius = 5000; // Radius in meters (adjust as needed)

axios.get(`https://dev.virtualearth.net/REST/v1/LocalSearch/?query=hospital&userCircularMapView=${location},${radius}&key=${apiKey}`)
  .then(response => {
    const hospitals = response.data.resourceSets[0].resources;
    
    if (hospitals.length === 0) {
      console.log('No hospitals found nearby.');
    } else {
      console.log('List of nearby hospitals:');
      for (const hospital of hospitals) {
        console.log(`Name: ${hospital.name}`);
        console.log(`Address: ${hospital.Address.formattedAddress}`);
        console.log(`Phone Number: ${hospital.PhoneNumber}`);
        console.log(`Website: ${hospital.Website}`);
        console.log('------------------------');
      }
    }
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });
