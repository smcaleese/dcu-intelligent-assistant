
export const mapSearchEngine = (input, mapData) => {
    const inputAllCaps = input.toUpperCase();
    const inputAllCapsArr = inputAllCaps.split(' '); // eg. ["HENRY", "GRATTAN", "BUILDING"]

    let searchTable = [];

    for(let i = 0; i < mapData.length; i++) {
        const currentTitle = mapData[i]["properties"].title
        const currentCoords = mapData[i]["geometry"].coordinates
        const currentTitleArr = currentTitle.split(' ');
        searchTable[i] = [currentTitle, currentCoords, 0]

        // count the number of word matches between the input string and each entry in the JSON database
        for(let j = 0; j < inputAllCapsArr.length; j++) {
            for(let k = 0; k < currentTitleArr.length; k++) {
                if(inputAllCapsArr[j] === currentTitleArr[k].toUpperCase()) {
                    searchTable[i][2] += 1
                }
            }
        }
    }

    const searchTableSorted = searchTable.sort((a, b) => {
        return b[2] - a[2]
    })

    // pick top element from sorted table, the element with the most matches
    const searchStringArr = searchTableSorted[0][0].split(' ')
    const searchStringResult = searchStringArr.join(' ')

    const searchCoords = searchTableSorted[0][1]
    const finalResult = [searchStringResult, searchCoords]
    return finalResult;
}



