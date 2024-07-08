export const BubbleSort = array => {
    const animations = [];
    const len = array.length;
    let temp;
    for(let i = 0; i < len; i++){
        for(let j = 0; j < len-i-1; j++){
            animations.push([0, j, j+1]);
            if(array[j] > array[j+1]){
                animations.push([2, j, j+1]);
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
            animations.push([1, j, j+1]);
        }
        animations.push([3, len-i-1, 0]);
    }
    return animations;
}