import React, { useEffect, useState } from 'react'
import '../../Style/LargeArraySorting.css'
import { MergeSort } from './Algorithms/MergeSortAlgorithm';
import { BubbleSort } from './Algorithms/BubbleSortAlgorithm';
import SelectionSortAlgorithm from './Algorithms/SelectionSortAlgorithm';
import InsertionSortAlgorithm from './Algorithms/InsertionSortAlgorithm';
import QuickSortAlgorithm from './Algorithms/QuickSortAlgorithm';


export default function LargeArraySorting() {
    const [array, setArray] = useState([]);
    const [maxValue, setMaxValue] = useState(0);
    const [sortingInProgress, setSortingInProgress] = useState(false);
    const primary_color = "turquoise";
    const secondary_color = 'red';
    const tertiary_color = '#57A846';
    let animationSpeed = .5;
    const arraySize = 300;
    
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
        const barContainer = document.getElementById('bar-Container');
        barContainer.classList.add('bar-transition');
        
        generateArray();
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < arraySize; i++){
            arrayBars[i].style.backgroundColor = primary_color;
        }
        setTimeout(() => {
            barContainer.classList.remove('bar-transition');
        }, 300);
    }
    function swapHeightOfBars(barOneStyle, barTwoStyle){
        const heightOne = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = heightOne;
    }
    
    function mergeSort() {
        const newArray = [...array];
        const animations = MergeSort(newArray);
        animationSpeed = 2;
        let length = animations.length;
        setSortingInProgress(true);
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < length; i++){
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
                    if(i === length-1) {
                        for(let k = 0; k < arrayBars.length; k++){
                            setTimeout(() => {
                                arrayBars[k].style.backgroundColor = tertiary_color;
                            }, k*1);
                        }
                        setSortingInProgress(false);
                    }
                }, i*animationSpeed);
            }
        }
    }

    function bubbleSort() {
        const newArray = [...array];
        animationSpeed = .1;
        const animations = BubbleSort(newArray);
        const length = animations.length;
        setSortingInProgress(true);
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < length; i++){
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
                    swapHeightOfBars(barOneStyle, barTwoStyle);
                }, i*animationSpeed)
            } 
            else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = tertiary_color;
                    if(i === length-1) setSortingInProgress(false);
                }, i*animationSpeed)
            }
        }
    }

    function selectionSort() {
        const newArray = [...array];
        const animations = SelectionSortAlgorithm(newArray);
        animationSpeed = .5;
        const barsArray = document.getElementsByClassName('array-bar');
        animations.forEach(([type, idxOne, idxTwo], index) => {
            const barOneStyle = barsArray[idxOne].style;

            if(type === 0){
                setTimeout(() => {
                    barOneStyle.backgroundColor = secondary_color;
                }, index*animationSpeed)
            } else if (type === 1){
                setTimeout(() => {
                    barOneStyle.backgroundColor = primary_color;
                }, index*animationSpeed)
            } else {
                setTimeout(() => {
                    swapHeightOfBars(barOneStyle, barsArray[idxTwo].style);
                    barsArray[idxTwo].style.backgroundColor = primary_color;
                    barOneStyle.backgroundColor = tertiary_color;
                }, index*animationSpeed);
            }
        })
    }
    
    function insertionSort() {
        const newArray = [...array];
        const animations = InsertionSortAlgorithm(newArray);
        animationSpeed = 300;
        const barsArray = document.getElementsByClassName('array-bar');
        animations.forEach(([type, idxOne, idxTwo], index) => {
            const barOneStyle = barsArray[idxOne].style;
            const isColorChange = type !== 2;
            if(isColorChange){
                setTimeout(() => {
                    barOneStyle.backgroundColor = type === 0 ? secondary_color : tertiary_color;
                }, index*animationSpeed);
            } else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = secondary_color;
                    barsArray[idxTwo].style.backgroundColor = tertiary_color;
                    swapHeightOfBars(barOneStyle, barsArray[idxTwo].style);
                }, index*animationSpeed)
            }
        })
    }
    
    function quickSort(){
        const newArray = [...array];
        const animations = QuickSortAlgorithm(newArray);
        animationSpeed = 3;
        console.log(animations);
        const barsArray = document.getElementsByClassName('array-bar');
        animations.forEach(([type, idxOne, idxTwo], index) => {
            const barOneStyle = barsArray[idxOne].style;
                if(type <= 1) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = type === 0 ? primary_color : secondary_color;
                    }, index*animationSpeed);
                } else if(type === 2){
                    setTimeout(() => {
                        swapHeightOfBars(barOneStyle, barsArray[idxTwo].style);
                    }, index*animationSpeed)
                } else if (type === 3){
                    setTimeout(() => {
                        barOneStyle.backgroundColor = tertiary_color;
                    }, index*animationSpeed)
                }
            }
        )
        
    }


    useEffect(() => {
        generateArray();
    }, [])


    return (
        <>
            <div className='main-container'>
                <div className='navbar'>
                    <button disabled={sortingInProgress} onClick={() => resetArray()}>Generate New Array</button>
                    <button disabled={sortingInProgress} onClick={() => mergeSort()}>Merge Sort</button>
                    <button disabled={sortingInProgress} onClick={() => bubbleSort()}>Bubble Sort</button>
                    <button disabled={sortingInProgress} onClick={() => selectionSort()}>Selection Sort</button>
                    <button disabled={sortingInProgress} onClick={() => insertionSort()}>Insertion Sort</button>
                    <button disabled={sortingInProgress} onClick={() => quickSort()}>Quick Sort</button>
                </div>
                <div className='array-container' id='bar-Container'>
                    {array.map((value, idx) => (
                        <div className='array-bar' key={idx} 
                            style={{height: `${value/maxValue*100}%`}}>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

