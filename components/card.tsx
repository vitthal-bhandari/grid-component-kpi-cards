"use client" 

import * as React from 'react';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, FormControl, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent, Switch } from '@mui/material';
import {sampleResponse} from '../components/response.js'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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

interface MetricsItem {
  // Define the properties of each object in the array
  id: string;
  displayName: string;
  isPercentageMetric: boolean;
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


interface MediaControlCardProps extends MetricsProps, SegmentProps {
  cardKey: number;
  cardState: CardData;
  updateCardState: (id: number, updatedData: Partial<CardData>) => void;
}

export default function MediaControlCard({ cardKey, metricsData, segmentData, cardState, updateCardState }: MediaControlCardProps) {
  const [chartDimensions, setChartDimensions] = React.useState({width: 0, height: 0})

  const cardRef = useRef<HTMLDivElement>(null);
  let latestMetric = 0
  let formattedNumber = ""
  let formattedPercentage = ""
  if (cardState.graphData && cardState.graphData.length > 0){
    latestMetric = cardState.graphData[0]["value"]
    formattedNumber = (latestMetric / 1000).toFixed(0) + 'K';
    const initial = cardState.graphData[cardState.graphData.length-1]["value"]
    const percentageChange = ((latestMetric - initial) / initial) * 100;
    formattedPercentage = percentageChange.toFixed(2) + '%';
  }

  const handleCardClick = (event: { stopPropagation: () => void; }) => {
    if(cardState.isClicked){
      event.stopPropagation(); // Prevent bubbling to document
      updateCardState(cardKey,{
        metrics: '',
        segmentKey: '',
        segmentId: '',
        isApiCalled: false,
        chartDimensions: { width: 0, height: 0 },
        graphData: [],
        isClicked: !cardState.isClicked,
      }); // Toggle state on click
    }
  };

  const handleChangeSegmentValue = (event: SelectChangeEvent) => {
    const targetValue = JSON.parse(event.target.value)
    updateCardState(cardKey, { segmentKey: targetValue.segmentKey, segmentId: targetValue.segmentId });
  };

  const handleChangeMetricsValue = (event: SelectChangeEvent) => {
    const targetValue = event.target.value
    updateCardState(cardKey, { metrics: targetValue });
  };

  const onCancelClick = () => {}

  const onAddClick = () => {
    updateCardState(cardKey, { isApiCalled: true, isClicked: !cardState.isClicked }); // Toggle state on click
  }

  const postData = {
    metric: cardState.metrics,
    segmentKey: cardState.segmentKey,
    segmentId: cardState.segmentId,
  }

  useEffect(() => {
    if (cardState.isApiCalled) {
      const postDataToServer = async () => {
        try {
          const response = await axios.post('https://sundial-fe-interview.vercel.app/api/snapshot', 
            postData);
            updateCardState(cardKey, { graphData: response.data.data.values, isApiCalled: false });
        } catch (err) {
          console.log(err)
        }
      };
      postDataToServer();
    }
  }, [cardState.isApiCalled]);

  useEffect(() => {
    console.log('inside card use effect')
    const updateDimensions = () => {
      if (cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth;
        const cardHeight = cardRef.current.offsetHeight;
        setChartDimensions({ width: cardWidth * 0.8, height: cardHeight * 0.7 });
      }
    };

    updateDimensions();

  }, []);

  const renderGraph = (data: any[]) => {
    const datarev = [...data].reverse();
    const width = chartDimensions["width"] > 0 ? chartDimensions["width"] : 100
    const height = chartDimensions["height"] > 0 ? chartDimensions["height"] : 75
    return (
      <AreaChart
        width={width}
        height={height}
        data={datarev}
        margin={{
          top: 0,
          right: 20,
          left: 20,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#119F97" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#119F97" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="date" hide={true}/>
        <YAxis  hide={true}/>
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#119F97" fill="url(#colorUv)" />
      </AreaChart>
    )
  }
  
  return (
    <Card 
      onClick={handleCardClick}
      sx={{ borderRadius: '1.75rem', overflow: 'hidden' }}
      className='flex flex-row align-center justify-center flex-grow min-h-64'
      ref={cardRef}
    >
      <Box className='flex flex-col items-center justify-center w-full'>
        <CardContent className='flex flex-col items-center justify-center w-full'>


          { !cardState.isClicked ? 
          <>

            <FormControl className='flex flex-col m-2' sx={{ margin: '0.5rem' }}>
                <InputLabel 
                  id="demo-simple-select-label"
                  sx={{ fontSize: '14px' }}
                >
                  Metrics
                </InputLabel>
                <Select
                  sx={{ borderRadius: '1rem', overflow: 'hidden', fontSize: '14px', minWidth: '250px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={metricsData.find((obj) => obj.id === cardState.metrics)?.displayName}
                  label="Metrics"
                  onChange={handleChangeMetricsValue}
                  className="w-full rounded-2xl"
                >
                  {metricsData.map((item: any, index: any) => (
                    <MenuItem key={item.id} value={item.id || item}>
                      {item.displayName || item}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

            <FormControl className='flex flex-col m-2' sx={{ margin: '0.5rem' }}>
              <InputLabel 
                id="demo-simple-select-label-values"
                sx={{ fontSize: '14px' }}
              >
                Segment Values
              </InputLabel>
              <Select
                sx={{ borderRadius: '1rem', overflow: 'hidden', fontSize: '14px', minWidth: '250px' }}
                labelId="demo-simple-select-label-values"
                id="demo-simple-select-values"
                value={(cardState.segmentId && cardState.segmentKey) ? JSON.stringify({'segmentId': cardState.segmentId, 'segmentKey': cardState.segmentKey}) : ''}
                label="Segment Values"
                onChange={handleChangeSegmentValue}
              >
                {segmentData.map((item: any, index: any) => (
                  [
                  <ListSubheader key={item.segmentKey} value={item.displayName}>
                      {item.displayName}
                  </ListSubheader>,
                  ...item.values.map((subitem: any, subindex: any) => (
                    <MenuItem key={item.segmentId} value={JSON.stringify({'segmentId': subitem.segmentId, 'segmentKey': item.segmentKey})}>
                        {subitem.displayName}
                    </MenuItem>
                  )),
                ]
                ))}
              </Select>
            </FormControl>

            <Box className='flex flex-row items-center justify-center mb-2'>

              <Button onClick={onCancelClick}
              sx={{ 
                margin: '0.5rem', 
                borderRadius: '0.875rem', 
                minWidth: '125px', 
                backgroundColor: 'rgba(255, 63, 57, 0.12)', 
                color: '#FF5D39', 
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#FF5D39',
                },  
              }}>
                Cancel
              </Button>

              <Button variant="contained" color="success" onClick={onAddClick}
              sx={{ 
                margin: '0.5rem', 
                borderRadius: '0.875rem', 
                minWidth: '125px', 
                backgroundColor: '#119F97', 
                color: 'white', 
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#106D67',
                },  
              }}>
                Add
              </Button>
            </Box>

          </>
          :
          <>
            <div className="flex justify-center items-center w-full">
              <Typography component="div" variant="subtitle1">
              {metricsData.find((obj) => obj.id === cardState.metrics)?.displayName + `, ` +
              segmentData.find((obj) => obj.segmentKey === cardState.segmentKey)?.values.find((obj) => obj.segmentId === cardState.segmentId)?.displayName}
              </Typography>
              
            </div>
            <div className="flex justify-between items-center w-full">
              <div>
              <Typography component="div" variant="h4">
              {formattedNumber}
              </Typography>
              <Typography component="div" variant="caption">
              {formattedPercentage +"  " +"\u2206 28d"}
              </Typography>
              </div>
              {renderGraph(cardState.graphData)}
            </div>
            
          </>
          }

        </CardContent>

      </Box>
    </Card>
  );
}
