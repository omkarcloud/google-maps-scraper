/**
 * @typedef {import('../../frontend/node_modules/botasaurus-controls/dist/index').Controls} Controls
 */


/**
 * @param {Controls} controls
 */
function getInput(controls) {
    controls
        .listOfLinks('websites', {
            defaultValue: ["https://www.apple.com/"],
            placeholder: "https://www.apple.com/",
            label: 'Websites',
            isRequired: true
        })
        .text('api_key', {
            placeholder: "2e5d346ap4db8mce4fj7fc112s9h26s61e1192b6a526af51n9",
            label: 'Rapid API Key',
            helpText: 'Enter your Rapid API key to extract website contacts',
            isRequired:true,
        })        
}