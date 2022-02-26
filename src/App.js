import React, { useState, useEffect } from 'react';
import { useData } from './utilities/firebase.js';
import { hasConflict, meetsPat, mapValues, addCourseTimes, addScheduleTimes, days, daysOverlap, hoursOverlap, timeConflict, courseConflict, getCourseTerm, terms } from './utilities/times.js';
import './App.css';
import CourseList from './components/CourseList';

const schedule = {
    "title": "CS Courses for 2018-2019",
    "courses": {
        "F101": {
            "id": "F101",
            "meets": "MWF 11:00-11:50",
            "title": "Computer Science: Concepts, Philosophy, and Connections"
        },
        "F110": {
            "id": "F110",
            "meets": "MWF 10:00-10:50",
            "title": "Intro Programming for non-majors"
        },
        "S313": {
            "id": "S313",
            "meets": "TuTh 15:30-16:50",
            "title": "Tangible Interaction Design and Learning"
        },
        "S314": {
            "id": "S314",
            "meets": "TuTh 9:30-10:50",
            "title": "Tech & Human Interaction"
        }
    }
};

const Banner = ({ title }) => (
    <h1>{title}</h1>
);




const App = () => {
    const [schedule, loading, error] = useData('/', addScheduleTimes);

    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading the schedule...</h1>

    return (
        <div className="container">
            <Banner title="Test independence integreation" />
            <CourseList courses={schedule.courses} />
        </div>
    );
};

export default App;