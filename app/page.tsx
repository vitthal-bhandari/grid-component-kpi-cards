"use client"

import MediaControlCard from "../components/card"
import { useEffect, useState } from "react";
import React from "react";
import { IconButton, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {sampleMetricsData} from '../components/response.js';
import { sampleSegmentsdata } from '../components/response.js';

const axios = require('axios').default;

interface SegmentValue {
  // Define the properties of each object in the array
  segmentId: string;
  displayName: string;
}

interface SegmentItem {
  // Define the properties of each object in the array
  segmentKey: string;
  displayName: string;
  values: SegmentValue[];
}


interface SegmentProps {
  segmentData: SegmentItem[]; // Type for data prop
}

interface MetricsProps {
  metricsData: MetricsItem[]; // Type for data prop
}

interface CardData {
  id: number;
  metrics: string;
  segmentKey: string;
  segmentId: string;
  isApiCalled: boolean;
  chartDimensions: { width: number; height: number };
  graphData: Array<{ date: string; value: number }>;
  isClicked: boolean;
}

function getMetricsData() {

  axios.get('https://sundial-fe-interview.vercel.app/api/metrics')
  .then(function (response: any) {
    return response.data
  })
  .catch(function (error: any) {
    console.log(error);
  })
}

function getSegmentData() {

  axios.get('https://sundial-fe-interview.vercel.app/api/segments')
  .then(function (response: any) {
    return response.data
  })
  .catch(function (error: any) {
    console.log(error);
  })
}

export default function Home() {

  const [cards, setCards] = useState<CardData[]>([]);
  const [metricsData, setMetricsData] = useState<MetricsItem[]>([]);
  const [segmentData, setSegmentData] = useState<SegmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getCardClasses = (index: number, totalCards: number) => {
    const positionInRow = (index % 3) + 1;
    const cardsInRow = Math.min(totalCards - (index - (index % 3)), 3);
    
    switch (cardsInRow) {
      case 1:
        return 'flex-grow basis-full';
      case 2:
        return 'flex-grow basis-1/2';
      case 3:
      default:
        return 'flex-grow basis-1/3';
    }
  };

  // Fetch data inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('https://sundial-fe-interview.vercel.app/api/metrics'),
          axios.get('https://sundial-fe-interview.vercel.app/api/segments')
        ]);

        setMetricsData(response1.data.data); // Update state with the first response data
        setSegmentData(response2.data.data); // Update state with the second response data
        setCards([{
          id: cards.length,
          metrics: '',
          segmentKey: '',
          segmentId: '',
          isApiCalled: false,
          chartDimensions: { width: 0, height: 0 },
          graphData: [],
          isClicked: false,
        }]);
        setLoading(false); // Set loading to false once both requests are completed
      } catch (err) {
        console.log(err);
        setLoading(false); // Set loading to false even if request fails
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleAddCard = (index: number) => {
    const newCard: CardData = {
      id: cards.length,
      metrics: '',
      segmentKey: '',
      segmentId: '',
      isApiCalled: false,
      chartDimensions: { width: 0, height: 0 },
      graphData: [],
      isClicked: false,
    };
    const newCards = [...cards.slice(0, index), newCard, ...cards.slice(index)];
    const updatedCards = newCards.map((card, idx) => ({
      ...card,
      id: idx
    }));
    setCards(updatedCards);
  };

  const updateCardState = (id: number, updatedData: Partial<CardData>) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, ...updatedData } : card
      )
    );
  };

  return (
    <div className="container max-w-6xl mx-auto p-4">
      <div className="flex flex-wrap m-20">
      {loading ? 
        <div>Loading...</div>
      :
      <>

          {cards.map((cardData, index) => (
            <div
              key={cardData.id}
              className={`flex justify-center items-center align-center ${getCardClasses(index, cards.length)}`}
            >
              <div className="justify-center items-center p-0">
                <IconButton onClick={() => handleAddCard(index)} sx={{padding: '0px'}}>
                  <AddCircleIcon />
                  
                </IconButton>
              </div>
              <Typography>{cardData.id}</Typography>

              <MediaControlCard 
              metricsData={metricsData}
              segmentData={segmentData}
              cardKey={cardData.id} 
              cardState={cardData}
              updateCardState={updateCardState}
              />           

              <div className="justify-center items-center">
                <IconButton onClick={() => handleAddCard(index+1)}>
                  <AddCircleIcon />
                </IconButton>
              </div>
            </div>
          ))}

    </>}
    </div>
      </div>

  );
}
