//this function will find distance/day
//hours of paddling/day etc

export function paddleInfoCalculator(trip, groupSize, days){
    let distance = 6;
    console.log(days, groupSize, trip)

    if (trip.difficulty === 1) {
        distance += 3;
    } else if (trip.difficulty === 2) {
        distance += 6;
    } else if (trip.difficulty === 3) {
        distance += 8;
    }

    if (trip.experience === 1) {
        distance -= 1;
    } else if (trip.experience === 3) {
        distance += 2;
    }

    //if days is greater than ten, group will need to double portage
    //takes more time to portage
    if (days > 10) {
        distance -= 2;
    }

    if (groupSize < 4) {
        distance += 1;
    } else if (groupSize > 6) {
        distance -= .5;
    }

    let mph = distance/6;

    return {distance: distance, mph: mph};
}

