import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';




const data = [
  {
    name: 'Candidate A', votes: 10,
  },
  {
    name: 'Candidate B',  votes: 2,
  },
  {
    name: 'Candidate C', votes: 3,
  },
  {
    name: 'Candidate D', votes: 44,
  },
  {
    name: 'Candidate E',  votes: 2,
  },
];


function Chart () {
    return (
      <BarChart
        width={800}
        height={600}
        data={data}
        margin={{
          top: 5, right: 40, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
            fontSize={15}
            dataKey="name" />
        <YAxis 
            fontSize={15}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes" fill="#00000" />
      </BarChart>
    );
}

export default Chart
