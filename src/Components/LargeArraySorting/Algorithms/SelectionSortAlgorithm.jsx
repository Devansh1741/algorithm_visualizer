export default function SelectionSortAlgorithm(array){
    const animations = [];
    const length = array.length;
    for(let i = 0; i < length; i++){
        let min = i;
        animations.push([0, i, 0]);
        for(let j = i+1; j < length; j++){
            animations.push([0, j, 0]);
            if(array[j] < array[min]){
                animations.push([1, min, 0]);
                min = j;
            }
            if(j !== min){
                animations.push([1, j, 0]);
            }
        }
        animations.push([2, i, min]);
        [array[i], array[min]] = [array[min], array[i]];
    }
    return animations;
}