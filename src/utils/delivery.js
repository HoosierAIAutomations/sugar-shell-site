export const DELIVERY_ZIPS = {
    // French Lick
    '47432': 10,
    // Paoli
    '47454': 5,
    // Orleans
    '47452': 5,
    // Elletsville
    '47429': 10,
    // Smithville
    '47458': 8,
    // Bedford
    '47421': 3,
    // Mitchell
    '47446': 5,
    // Oolitic
    '47451': 5,
    // Avoca
    '47420': 5,
    // Bloomington
    '47401': 10,
    '47402': 10,
    '47403': 10,
    '47404': 10,
    '47405': 10,
    '47406': 10,
    '47407': 10,
    '47408': 10,
    '47409': 10,
    '47490': 10,
    '47499': 10,
};

export function getDeliveryFee(zipCode) {
    if (!zipCode) return null;
    const code = zipCode.trim();
    if (DELIVERY_ZIPS.hasOwnProperty(code)) {
        return DELIVERY_ZIPS[code];
    }
    return null; // Null means not in delivery area
}
