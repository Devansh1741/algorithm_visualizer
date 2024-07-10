export default function QuickSortAlgorithm(array) {
    const animations = []
    quickSort(array, 0, array.length-1, animations);
    console.log(animations);
    return animations;
}

function partition(array, low, high, animations) {
    let pivot = array[high];
    let i = low-1;
    animations.push([1, high, -1]);
    for(let j = low; j <= high; j++){
        animations.push([1, j, -1]);
        if(array[j] < pivot){
            i++;
            animations.push([2, i, j]);
            [array[i], array[j]] = [array[j], array[i]];
        }
        animations.push([0, j, 0]);
    }
    animations.push([2, i+1, high]);
    animations.push([3, i+1, 0]);
    [array[i+1], array[high]] = [array[high], array[i+1]];
    return i+1;
}

function quickSort(array, low, high, animations){
    if(low < high){
        let pi = partition(array, low, high, animations);
        quickSort(array, low, pi-1, animations);
        quickSort(array, pi+1, high, animations);
    } else if(low === high){
        animations.push([3, low, 0]);
    }
}
