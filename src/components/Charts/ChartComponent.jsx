import React, { useEffect, useRef } from 'react';
import { useTheme} from '../../Context/ThemeContext';
import Chart from 'chart.js/auto';
import './ChartComponent.css';

const ChartComponent = () => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: theme === 'light' ? 'rgba(54, 162, 235, 0.5)' : 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: theme === 'light' ? '#333' : '#f0f0f0'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: theme === 'light' ? '#333' : '#f0f0f0'
              },
              grid: {
                color: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
              }
            },
            x: {
              ticks: {
                color: theme === 'light' ? '#333' : '#f0f0f0'
              },
              grid: {
                color: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [theme]);

  return (
    <div className={`chart-container ${theme}`}>
      <h2>Sales Data</h2>
      <div className="chart-wrapper">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;