"use client"

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ChartDataType {
    name: string;
    appointments?: number;
    users?: number;
}

interface ChartProps {
    chartData: ChartDataType[];
    name: string;
}

const Chart: React.FC<ChartProps> = ({ chartData, name }) => {

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `New ${name === 'user' ? 'Users' : 'Appointments'} by Month`,
                color: '#fff',
                font: {
                    size: 16,
                },
            },
            legend: {
                labels: {
                    color: '#fff',
                },
            },
        },
        scales: {
            x: {
                type: 'category',
                ticks: {
                    color: '#fff',
                },
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: '#fff',
                },
            },
        },
    };

    const labels = chartData.map(item => item.name);
    const data = {
        labels,
        datasets: [
            {
                label: `New ${name === 'user' ? 'Users' : 'Appointments'}`,
                data: chartData.map(item => name === 'user' ? item.users : item.appointments),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y',
                pointBackgroundColor: 'rgba(255, 255, 255, 0.8)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(53, 162, 235, 1)',
            },
        ],
    };

    return (
        <div className='bg-gray-800 rounded-md p-6 h-[250px] w-full amd:w-3/4 alg:w-1/2 mx-auto'>
            <Line options={options} data={data} />
        </div>
    );
};

export default Chart;