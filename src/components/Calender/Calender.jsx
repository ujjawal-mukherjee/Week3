import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import './Calender.css';

const CalendarComponent = () => {
    const { theme } = useTheme();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([
        { id: 1, title: 'Team Meeting', date: new Date(2023, 5, 15), color: '#4CAF50' },
        { id: 2, title: 'Project Deadline', date: new Date(2023, 5, 20), color: '#F44336' },
        { id: 3, title: 'Client Call', date: new Date(2023, 5, 22), color: '#2196F3' },
    ]);

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = () => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        const firstDay = firstDayOfMonth();

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Cells for each day of the month
        for (let i = 1; i <= totalDays; i++) {
            const dayEvents = events.filter(event =>
                event.date.getDate() === i &&
                event.date.getMonth() === currentDate.getMonth() &&
                event.date.getFullYear() === currentDate.getFullYear()
            );

            days.push(
                <div key={`day-${i}`} className="calendar-day">
                    <div className="day-number">{i}</div>
                    <div className="events">
                        {dayEvents.map(event => (
                            <div
                                key={event.id}
                                className="event"
                                style={{ backgroundColor: event.color }}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className={`calendar-container ${theme}`}>
            <h2>Calendar</h2>
            <div className="calendar-header">
                <button onClick={prevMonth}>&lt; Prev</button>
                <h3>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h3>
                <button onClick={nextMonth}>Next &gt;</button>
            </div>
            <div className="calendar-grid">
                <div className="calendar-weekday">Sun</div>
                <div className="calendar-weekday">Mon</div>
                <div className="calendar-weekday">Tue</div>
                <div className="calendar-weekday">Wed</div>
                <div className="calendar-weekday">Thu</div>
                <div className="calendar-weekday">Fri</div>
                <div className="calendar-weekday">Sat</div>
                {renderDays()}
            </div>
        </div>
    );
};

export default CalendarComponent;