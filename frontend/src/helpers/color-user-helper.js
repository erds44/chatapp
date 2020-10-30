const FLAT_BLUE = '#355ca9';
const DEEP_LAVENDER = '#8665b6';
const AZURE = '#2196f2';
const COOL_BLUE = '#5571bc';
const ORANGE_RED = '#fe5722';
const SLATE = '#43555f';
const TEAL = '#009688';
const MARIGOLD = '#febf0a';
const PINK = '#e81f63';
const AZURE_TWO = '#06a9f3';
const TURQUOISE_BLUE = '#03bcd3';
const TANGERINE = '#fe9800';
const SUNSHINE_YELLOW = '#feea3b';
const SICKLY_YELLOW = '#ccdb3a';
const GREEN = '#8bc24b';
const MID_GREEN = '#4baf50';
const VIRIDIAN = '#22828d';
const FRENCH_BLUE = '#3f51b5';
const BARNEY = '#9c26b0';
const BLUEY_PURPLE = '#673ab7';
const BLUE_GREY = '#607d8b';
const WARM_GREY = '#9e9e9e';
const DARK_TAUPE = '#795548';

const COLORS = [
    FLAT_BLUE,
    AZURE,
    COOL_BLUE,
    ORANGE_RED,
    SLATE,
    DEEP_LAVENDER,
    TEAL,
    MARIGOLD,
    PINK,
    AZURE_TWO,
    TURQUOISE_BLUE,
    TANGERINE,
    SUNSHINE_YELLOW,
    SICKLY_YELLOW,
    GREEN,
    MID_GREEN,
    VIRIDIAN,
    FRENCH_BLUE,
    BARNEY,
    BLUEY_PURPLE,
    BLUE_GREY,
    WARM_GREY,
    DARK_TAUPE,
];
let copyCOLORS = [
    ...COLORS,
];

const getAColor = () => {
    let color = copyCOLORS.shift();
    if (!color) {
        copyCOLORS = [
            ...COLORS,
        ];
        color = copyCOLORS.shift();
    }
    return color;
};

const COLOR_ASSIGNS = {};
const assignColors = (id) => {
    if (!COLOR_ASSIGNS[id]) {
        COLOR_ASSIGNS[id] = getAColor();
    }
    return COLOR_ASSIGNS[id];
};
export default assignColors;
