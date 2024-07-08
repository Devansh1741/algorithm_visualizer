import React, { useEffect, useState } from 'react'
import './SortingVisualizer.css'
import { MergeSort } from '../Algorithms/Sorting/MergeSortAlgorithm';
import { BubbleSort } from '../Algorithms/Sorting/BubbleSortAlgorithm';


export default function SortingVisualizer() {
    const [array, setArray] = useState([]);
    const [maxValue, setMaxValue] = useState(0);
    const [sortingInProgress, setSortingInProgress] = useState(false);
    const primary_color = "turquoise";
    const secondary_color = 'red';
    const tertiary_color = 'orange';
    let animationSpeed = .5;
    const arraySize = 310;
    
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min+1) + min);
    }
    function generateArray() {
        const newArray = [];
        for(let i = 0; i < arraySize; i++){
            newArray.push(randomInt(5, 1000));
        }
        setArray(newArray);
        setMaxValue(Math.max(...newArray));
    } 
    function resetArray() {
        generateArray();
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < arraySize; i++){
            arrayBars[i].style.backgroundColor = primary_color;
        }
    }
    
    function mergeSort() {
        const newArray = [...array];
        const animations = MergeSort(newArray);
        animationSpeed = 3;
        let length = animations.length;
        setSortingInProgress(true);
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
                    if(i === length-1) setSortingInProgress(false);
                }, i*animationSpeed);
            }
        }
    }

    function bubbleSort() {
        const newArray = [...array];
        animationSpeed = .3;
        const animations = BubbleSort(newArray);
        console.log(animations);
        const length = animations.length;

        for(let i = 0; i < length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const [type, barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            if(type <= 1){
                setTimeout(() => {
                    let color = type%2 === 0 ? secondary_color : primary_color;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*animationSpeed)
            } else if (type === 2) {
                setTimeout(() => {
                    let heightOne = parseFloat(barOneStyle.height);
                    let heightTwo = parseFloat(barTwoStyle.height);
                    barOneStyle.height = `${heightTwo}%`;
                    barTwoStyle.height = `${heightOne}%`;
                    console.log(type, barOneIdx, barTwoIdx, heightOne, heightTwo, barOneStyle.height, barTwoStyle.height);
                }, i*animationSpeed)
            } 
            else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = tertiary_color;
                }, i*animationSpeed)
            }
        }
    }

    useEffect(() => {
        generateArray();
    }, [])


    return (
        <>
            <div className='main-container'>
                <div className='array-container'>
                    {array.map((value, idx) => (
                        <div className='array-bar' key={idx} 
                        style={{height: `${value/maxValue*100}%`,}}></div>
                    ))}
                </div>
                <div className='footer'>
                    <button disabled={sortingInProgress} onClick={() => resetArray()}>Generate New Array</button>
                    <button disabled={sortingInProgress} onClick={() => mergeSort()}>Merge Sort</button>
                    <button disabled={sortingInProgress} onClick={() => bubbleSort()}>Bubble Sort</button>
                </div>
            </div>
        </>
    )
}

