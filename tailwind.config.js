import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

const widthSaveList = [];
const widthValues = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40,
    44, 48, 52, 56, 60, 64, 72, 80, 96,
];

for (const widthValue in widthValues) {
    widthSaveList.push(`w-${widthValues[widthValue]}`);
}

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    safelist: widthSaveList,
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
        "./resources/js/**/*.ts",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            inset: {
                "550px": "550px",
            },
        },
    },

    plugins: [forms, require("tailwind-scrollbar")],
};
