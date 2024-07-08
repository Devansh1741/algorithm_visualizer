import React, { useEffect, useState } from 'react'
import './SortingVisualizer.css'
import { MergeSort } from '../Algorithms/Sorting/MergeSortAlgorithm';


export default function SortingVisualizer() {
    const [array, setArray] = useState([]);
    const [maxValue, setMaxValue] = useState(0);
    const [sortingInProgress, setSortingInProgress] = useState(false);
    const primary_color = "turquoise";
    const secondary_color = 'red';
    const animationSpeed = 5;
    
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min+1) + min);
    }
    function resetArray() {
        const newArray = [];
        for(let i = 0; i < 310; i++){
            newArray.push(randomInt(5, 1000));
        }
        setArray(newArray);
        setMaxValue(Math.max(...newArray));
    } 
    
    function mergeSort() {
        const animations = MergeSort(array);
        console.log("Animations Array", animations);
        let length = animations.length;
        // setSortingInProgress(true);
        for(let i = 0; i < length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i%3 !== 2;
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i%3 === 0 ? secondary_color : primary_color;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*animationSpeed);
            } else {
                setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    barStyle.height = `${newHeight/maxValue*100}%`;
                    // if( i === length-1) setSortingInProgress(false);
                }, i*animationSpeed);
            }
        }
    }

    useEffect(() => {
        resetArray();
    }, [])


    return (
        <>
            <div>
                <div className='array-container'>
                    {array.map((value, idx) => (
                        <div className='array-bar' style={{height: `${value/maxValue*100}%`}}></div>
                    ))}
                </div>
            <button disabled={sortingInProgress} onClick={() => mergeSort()}>Sort</button>
            </div>
        </>
    )
}

