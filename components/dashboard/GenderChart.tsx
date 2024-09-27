"use client"

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    ArcElement,  
    Title,
    Tooltip,
    Legend
);

interface ChartDataType {
    Male: number;
    Female: number;
    Other: number;
}

interface ChartProps {
    chartData: ChartDataType;
}

const GenderChart: React.FC<ChartProps> = ({ chartData }) => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Gender Distribution of Users`,
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
    };

    const data = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: 'User Gender Distribution',
            data: [chartData.Male, chartData.Female, chartData.Other],
            backgroundColor: [
                'rgb(54, 162, 235)',  
                'rgb(255, 99, 132)',  
                'rgb(255, 205, 86)'  
            ],
            hoverOffset: 4
        }]
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '250px' }}>
            <Doughnut options={options} data={data} />
        </div>
    );
}

export default GenderChart;