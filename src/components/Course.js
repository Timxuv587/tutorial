import React, { useState, useEffect } from 'react';
import { hasConflict, meetsPat, mapValues, addCourseTimes, addScheduleTimes, days, daysOverlap, hoursOverlap, timeConflict, courseConflict, getCourseTerm, terms } from '../utilities/times.js';
import '../App.css';
const getCourseNumber = course => (
    course.id.slice(1, 4)
);

const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);


const Course = ({ course, selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const style = {
        backgroundColor: isDisabled ? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
    return (
        <div className="card m-1 p-2"
            style={style}
            onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}>
            <div className="card-body">
                <div className="card-title">{getCourseTerm(course)} CS {getCourseNumber(course)}</div>
                <div className="card-text">{course.title}</div>
            </div>
        </div>
    );
};

export default Course