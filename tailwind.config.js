module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            transitionProperty: {
                'visibility': 'visibility',
                'opacity': 'opacity'
            }
        },
    },
    variants: {
        extend: {
            visibility: ["group-hover"],
            opacity: ["group-hover"]
        }
    },
    plugins: [],
}