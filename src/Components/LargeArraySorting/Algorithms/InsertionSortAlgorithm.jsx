export default function (array) {
    const length = array.length;
    const animations = [];
    animations.push([1, 0, 0]);
    for(let i = 1; i < length; i++){
        let j = i-1;
        animations.push([0, i, 0]);
        const key = array[i];
        while(j >= 0 && array[j] > key){
            array[j+1] = array[j];
            animations.push([2, j, j+1]);
            j -= 1;
        }
        array[j+1] = key;
        animations.push([1, j+1, 0]);
    }
    return animations;
}