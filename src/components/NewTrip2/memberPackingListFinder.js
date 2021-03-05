//this function will find the member packing list we need 
//based on how many days the trip is

function memberPackingListFinder(days) {
    let itemArray = [

        {
            name: 'Pairs of wool socks',
            quantity: 4
        },
        {
            name: 'sleeping bag',
            quantity: 1
        },
        {
            name: 'sleeping pad',
            quantity: 1
        },
        {
            name: 'toiletries',
            quantity: 1
        },
        {
            name: 'warm layer',
            quantity: 1
        },
        {
            name: 'head lamp',
            quantity: 1
        },
        {
            name: 'shirts',
            quantity: 3
        },
        {
            name: 'baseball cap',
            quantity: 1
        },
        {
            name: 'pants',
            quantity: 1
        },
        {
            name: 'shorts',
            quantity: 1
        },
        {
            name: 'eating utensil',
            quantity: 1
        },
        {
            name: 'bowl',
            quantity: 1
        },
        {
            name: 'sunglasses',
            quantity: 1
        },
        {
            name: 'Camp shoes/flip-flops',
            quantity: 1
        },
        {
            name: 'rain jacket',
            quantity: 1
        },
        {
            name: 'Warm hat',
            quantity: 1
        },
        {
            name: 'Long underwear (if the weather will be cold)',
            quantity: 1
        },


    ]
    return itemArray;
}

module.exports = memberPackingListFinder;