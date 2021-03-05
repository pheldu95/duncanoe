
function groupPackingListFinder(members){
    let groupItemArray = [
        {
            name: 'Canoes',
            quantity: Math.ceil(members/3),
            rental: false
        },
        {
            name: 'Paddles',
            quantity: (Math.ceil(members/3))*2,
            rental: false
        },
        {
            name: '4 Person Tents',
            quantity: Math.ceil(members/4),
            rental: false
        },
        {
            name: 'Cooking pot',
            quantity: 1,
            rental: false
        },
        {
            name: 'Gas stove',
            quantity: 1,
            rental: false
        },
        {
            name: 'Gas cannisters',
            quantity: 2,
            rental: false
        },
        {
            name: 'Rope (25 ft)',
            quantity: 5,
            rental: false
        },
        {
            name: 'Garbage bags',
            quantity: Math.ceil(members/2),
            rental: false
        },
        {
            name: 'Compass',
            quantity: 1,
            rental: false
        },
        {
            name: 'Lighters',
            quantity: 2,
            rental: false
        },
        {
            name: 'Life vests',
            quantity: members,
            rental: false
        },
        {
            name: 'Duct tape roll',
            quantity: Math.ceil(members/3),
            rental: false
        },
        {
            name: 'Pocket knife',
            quantity: 2,
            rental: false
        },
        {
            name: 'Bottle of iodine tablets',
            quantity: Math.ceil(members/3),
            rental: false
        },
        {
            name: 'Bottle of sunscreen',
            quantity: Math.ceil(members/2),
            rental: false
        },
        {
            name: 'Map',
            quantity: 1,
            rental: false
        },
        {
            name: 'Waterproof bag (for keys, phones, lighters etc)',
            quantity: 1,
            rental: false
        },
        {
            name: 'Tarps',
            quantity: 2,
            rental: false
        },
        {
            name: 'Bugspray bottle',
            quantity: Math.ceil(members/3),
            rental: false
        },
        {
            name: 'Bear rope (or some other method of keeping bears from your food)',
            quantity: 1,
            rental: false
        },
        {
            name: 'First aid kit',
            quantity: 1,
            rental: false
        }
    ]
    return groupItemArray;
    
}

module.exports = groupPackingListFinder;