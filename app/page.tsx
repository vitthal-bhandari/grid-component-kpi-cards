"use client"

import MediaControlCard from "../components/card"
import { useState } from "react";
import React from "react";
import { IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {sampleMetricsData} from '../components/response.js';
import { sampleSegmentsdata } from '../components/response.js';

interface CardData {
  content: string;
  editMode: boolean;
}

// async function getMetricsData() {
//   const res = await fetch('https://sundial-fe-interview.vercel.app/api/metrics')
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

// async function getSegmentData() {
//   const res = await fetch('https://sundial-fe-interview.vercel.app/api/segments')
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

export default function Home() {

  const axios = require('axios').default;

  const [cards, setCards] = useState<CardData[]>([{content: '', editMode: true}]);
  const [metricsData, setMetricsData] = useState(sampleMetricsData);
  const [segmentData, setSegmentData] = useState(sampleSegmentsdata);

  // axios.get('https://sundial-fe-interview.vercel.app/api/metrics')
  // .then(function (response: any) {
  //   // handle success
  //   setMetricsData(response.data)
  // })
  // .catch(function (error: any) {
  //   // handle error
  //   console.log(error);
  // })
  // .finally(function () {
  //   // always executed
  // });

  // axios.get('https://sundial-fe-interview.vercel.app/api/segments')
  // .then(function (response: any) {
  //   // handle success
  //   setSegmentData(response.data)
  // })
  // .catch(function (error: any) {
  //   // handle error
  //   console.log(error);
  // })
  // .finally(function () {
  //   // always executed
  // });

  console.log('metricsData: ', metricsData)
  console.log('segmentData: ', segmentData)

  const handleAddCardBefore = () => {
    setCards((prevCards) => [
      { content: '', editMode: true }, // New card with edit mode on
      ...prevCards,
    ]);
  };

  const handleAddCardAfter = (index: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards.splice(index + 1, 0, { content: '', editMode: true });
      return newCards;
    });
  };

  const handleAddCard = (index: number) => {
    if (index === 0) {
      handleAddCardBefore();
    } else {
      handleAddCardAfter(index - 1); // Adjust index for adding after
    }
  };

  return (
    <div className="container max-w-3xl mx-auto flex flex-wrap"> {/* Overall container */}

    {cards.length > 0 && (
            <div className="w-full sm:w-1/3 md:w-1/3 flex justify-center items-center">
              <IconButton onClick={handleAddCardBefore}>
                <AddCircleIcon /> {/* Plus icon before first card */}
              </IconButton>
            </div>
          )}
          {cards.map((cardData, index) => (
            <div
              key={index}
              className="w-full sm:w-1/3 md:w-1/3 px-2 flex justify-center items-center"
            >
          <MediaControlCard 
          key={index} 
          metricsData={metricsData["data"]} 
          segmentData={segmentData["data"]}
          /> {/* Render card */}              
          {index < cards.length - 1 && (
                <div className="w-full sm:w-1/3 md:w-1/3 flex justify-center items-center">
                  <IconButton onClick={() => handleAddCard(index)}>
                    <AddCircleIcon /> {/* Plus icon between cards */}
                  </IconButton>
                </div>
              )}
            </div>
          ))}

      </div>

  );
}
