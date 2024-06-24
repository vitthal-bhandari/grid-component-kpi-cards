"use client" 

import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, FormControl, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {sampleResponse} from '../components/response.js'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface SegmentItem {
  // Define the properties of each object in the array
  segmentKey: string;
  displayName: string;
  values: string[];
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

export default function MediaControlCard({metricsData, segmentData}: MetricsProps & SegmentProps) {

  const [metrics, setMetrics] = React.useState('');
  const [segmentKey, setSegmentKey] = React.useState('');
  const [segmentId, setSegmentId] = React.useState('');
  const [isApiCalled, setIsApiCalled] = React.useState(false);
  const [graphData, setGraphData] = React.useState<Array<{ date: string; value: number }>>([]);
  const [isClicked, setIsClicked] = React.useState(false); // false=edit, true=view mode

  const handleCardClick = (event: { stopPropagation: () => void; }) => {
    if(isClicked){
      event.stopPropagation(); // Prevent bubbling to document
      setIsClicked(!isClicked); // Toggle state on click
    }
  };


  const handleChangeSegmentValue = (event: SelectChangeEvent) => {
    const targetValue = JSON.parse(event.target.value)
    setSegmentKey(targetValue.segmentKey)
    setSegmentId(targetValue.segmentId)
  };

  const handleChangeMetricsValue = (event: SelectChangeEvent) => {
    const targetValue = event.target.value
    setMetrics(targetValue);
  };

  const onCancelClick = () => {}

  const onAddClick = () => {
    setIsApiCalled(true);
    setIsClicked(!isClicked); // Toggle state on click
  }

  useEffect(() => {
    if (isApiCalled) {
    const fetchData = async () => {
      // const response = await fetch('https://sundial-fe-interview.vercel.app/api/snapshot', {
      //   method: 'POST', // Change method to POST
      //   headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://sundial-fe-interview.vercel.app/api/snapshot' },
      //   body: JSON.stringify({
      //     metric: metrics,
      //     segmentKey: segmentKey,
      //     segmentId: segmentId,
      //   }),
      // })
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`)
      // }
      // const result = await response.json()
      setGraphData(sampleResponse["data"]["values"])
    }
 
    fetchData().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e)
    })
    setIsApiCalled(false); // Reset the flag after the call
  }
  }, [isApiCalled])

  const renderGraph = (data: any[] | undefined) => {
    console.log('graph data: ', data)
    return (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    )
  }
  
  return (
    <Card onClick={handleCardClick} sx={{ display: 'flex', minWidth: '250px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>


          { !isClicked ? 
          <>

            <FormControl fullWidth className='flex flex-col mb-2'>
                <InputLabel id="demo-simple-select-label">Metrics</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={metricsData.find((obj) => obj.id === metrics)?.displayName}
                  label="Metrics"
                  onChange={handleChangeMetricsValue}
                >
                  {metricsData.map((item: any, index: any) => (
                    <MenuItem key={item.id} value={item.id || item}>
                      {item.displayName || item}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

            <FormControl fullWidth className='flex flex-col mb-2'>
              <InputLabel id="demo-simple-select-label-values">Segment Values</InputLabel>
              <Select
                labelId="demo-simple-select-label-values"
                id="demo-simple-select-values"
                value={(segmentId && segmentKey) ? JSON.stringify({'segmentId': segmentId, 'segmentKey': segmentKey}) : ''}
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
              <Button variant="outlined" color="error" onClick={onCancelClick}>
                Cancel
              </Button>

              <Button variant="contained" color="success" onClick={onAddClick}>
                Add
              </Button>
            </Box>

          </>
          :
          <>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
            {renderGraph(graphData)}
          </>
          }

        </CardContent>

      </Box>
    </Card>
  );
}
