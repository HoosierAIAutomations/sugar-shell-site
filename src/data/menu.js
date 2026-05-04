import classicChip from '../assets/products/classicchocolatechipcookies.png';
import darkDream from '../assets/products/darkchocolatedreamcookies.png';
import pbBlossoms from '../assets/products/peanutbutterblossomcookies.png';
import doublePb from '../assets/products/doublepeanutbutterchocolatechipcookies.png';
import brownies from '../assets/products/doublechocolatechipbrownies.png';

export const PRODUCTS = [
    {
        id: 'dark-chocolate-dream',
        name: 'Dark Chocolate Dream',
        quantityInfo: '(one 4oz. cookie)',
        category: 'cookie',
        price: 4.00,
        size: '4oz',
        description: 'Soft, rich dark chocolate cookies with a deep chocolate flavor and melty chocolate chips in every bite.',
        ingredients: 'butter, brown sugar, granulated sugar, egg, vanilla, flour, cocoa powder, baking soda, salt, semi-sweet chocolate chips.',
        image: darkDream
    },
    {
        id: 'peanut-butter-blossoms',
        name: 'Peanut Butter Blossoms',
        quantityInfo: '(one 4oz. cookie)',
        category: 'cookie',
        price: 4.00,
        size: '4oz',
        description: 'Soft, chewy Peanut Butter cookies rolled in sugar and topped with decadent melty chocolate.',
        ingredients: 'flour, baking soda, salt, butter, peanut butter, granulated sugar, brown sugar, egg, vanilla, milk, milk chocolate.',
        image: pbBlossoms
    },
    {
        id: 'double-pb-chocolate-chip',
        name: 'Double Peanut Butter Chocolate Chip',
        quantityInfo: '(one 4oz. cookie)',
        category: 'cookie',
        price: 4.00,
        size: '4oz',
        description: 'A classic peanut butter cookie packed with chunks of Reese\'s peanut butter cups and chocolate chips.',
        ingredients: 'butter, brown sugar, granulated sugar, peanut butter, flour, baking soda, baking powder, salt, eggs, vanilla, reese peanut butter cups, semi-sweet chocolate chips.',
        image: doublePb
    },
    {
        id: 'classic-chocolate-chip',
        name: 'Classic Chocolate Chip',
        quantityInfo: '(one 4oz. cookie)',
        category: 'cookie',
        price: 4.00,
        size: '4oz',
        description: 'Soft and chewy cookies with rich chocolate chips. Simple and sweet.',
        ingredients: 'butter, brown sugar, granulated sugar, eggs, vanilla, flour, salt, baking soda, semi-sweet chocolate chips, topped with a sprinkle of flaky sea salt.',
        image: classicChip
    },
    {
        id: 'double-chocolate-brownie',
        name: 'Double Chocolate Chip Brownies',
        quantityInfo: '(one 3x3in brownie)',
        category: 'brownie',
        price: 3.00,
        size: '3x3"',
        description: 'Rich, fudgy double chocolate chip brownies that melt in your mouth.',
        ingredients: 'salt, granulated sugar, eggs, vanilla, vegetable oil, cocoa powder, flour, corn starch, semi-sweet chocolate chips.',
        image: brownies
    }
];

