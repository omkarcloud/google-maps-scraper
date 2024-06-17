/**
 * @typedef {import('../../frontend/node_modules/botasaurus-controls/dist/index').Controls} Controls
 */

const CountryOptions = [{ "value": "AF", "label": "Afghanistan (49 Cities)" }, { "value": "AX", "label": "Aland Islands (1 City)" }, { "value": "AL", "label": "Albania (21 Cities)" }, { "value": "DZ", "label": "Algeria (250 Cities)" }, { "value": "AS", "label": "American Samoa (1 City)" }, { "value": "AD", "label": "Andorra (2 Cities)" }, { "value": "AO", "label": "Angola (26 Cities)" }, { "value": "AI", "label": "Anguilla (1 City)" }, { "value": "AG", "label": "Antigua and Barbuda (1 City)" }, { "value": "AR", "label": "Argentina (225 Cities)" }, { "value": "AM", "label": "Armenia (19 Cities)" }, { "value": "AW", "label": "Aruba (3 Cities)" }, { "value": "AU", "label": "Australia (289 Cities)" }, { "value": "AT", "label": "Austria (48 Cities)" }, { "value": "AZ", "label": "Azerbaijan (59 Cities)" }, { "value": "BS", "label": "Bahamas (3 Cities)" }, { "value": "BH", "label": "Bahrain (8 Cities)" }, { "value": "BD", "label": "Bangladesh (104 Cities)" }, { "value": "BB", "label": "Barbados (1 City)" }, { "value": "BY", "label": "Belarus (49 Cities)" }, { "value": "BE", "label": "Belgium (224 Cities)" }, { "value": "BZ", "label": "Belize (5 Cities)" }, { "value": "BJ", "label": "Benin (29 Cities)" }, { "value": "BM", "label": "Bermuda (1 City)" }, { "value": "BT", "label": "Bhutan (4 Cities)" }, { "value": "BO", "label": "Bolivia (39 Cities)" }, { "value": "BQ", "label": "Bonaire, Saint Eustatius and Saba  (1 City)" }, { "value": "BA", "label": "Bosnia and Herzegovina (22 Cities)" }, { "value": "BW", "label": "Botswana (18 Cities)" }, { "value": "BR", "label": "Brazil (1200 Cities)" }, { "value": "VG", "label": "British Virgin Islands (1 City)" }, { "value": "BN", "label": "Brunei (4 Cities)" }, { "value": "BG", "label": "Bulgaria (56 Cities)" }, { "value": "BF", "label": "Burkina Faso (41 Cities)" }, { "value": "BI", "label": "Burundi (10 Cities)" }, { "value": "CV", "label": "Cabo Verde (4 Cities)" }, { "value": "KH", "label": "Cambodia (27 Cities)" }, { "value": "CM", "label": "Cameroon (63 Cities)" }, { "value": "CA", "label": "Canada (329 Cities)" }, { "value": "KY", "label": "Cayman Islands (2 Cities)" }, { "value": "CF", "label": "Central African Republic (20 Cities)" }, { "value": "TD", "label": "Chad (24 Cities)" }, { "value": "CL", "label": "Chile (103 Cities)" }, { "value": "CN", "label": "China (1784 Cities)" }, { "value": "CX", "label": "Christmas Island (1 City)" }, { "value": "CC", "label": "Cocos Islands (1 City)" }, { "value": "CO", "label": "Colombia (303 Cities)" }, { "value": "KM", "label": "Comoros (2 Cities)" }, { "value": "CK", "label": "Cook Islands (1 City)" }, { "value": "CR", "label": "Costa Rica (40 Cities)" }, { "value": "HR", "label": "Croatia (25 Cities)" }, { "value": "CU", "label": "Cuba (126 Cities)" }, { "value": "CW", "label": "Curacao (1 City)" }, { "value": "CY", "label": "Cyprus (9 Cities)" }, { "value": "CZ", "label": "Czechia (96 Cities)" }, { "value": "CD", "label": "Democratic Republic of the Congo (68 Cities)" }, { "value": "DK", "label": "Denmark (59 Cities)" }, { "value": "DJ", "label": "Djibouti (4 Cities)" }, { "value": "DM", "label": "Dominica (1 City)" }, { "value": "DO", "label": "Dominican Republic (48 Cities)" }, { "value": "EC", "label": "Ecuador (66 Cities)" }, { "value": "EG", "label": "Egypt (133 Cities)" }, { "value": "SV", "label": "El Salvador (35 Cities)" }, { "value": "GQ", "label": "Equatorial Guinea (3 Cities)" }, { "value": "ER", "label": "Eritrea (6 Cities)" }, { "value": "EE", "label": "Estonia (8 Cities)" }, { "value": "SZ", "label": "Eswatini (3 Cities)" }, { "value": "ET", "label": "Ethiopia (91 Cities)" }, { "value": "FK", "label": "Falkland Islands (1 City)" }, { "value": "FO", "label": "Faroe Islands (1 City)" }, { "value": "FJ", "label": "Fiji (6 Cities)" }, { "value": "FI", "label": "Finland (76 Cities)" }, { "value": "FR", "label": "France (649 Cities)" }, { "value": "GF", "label": "French Guiana (5 Cities)" }, { "value": "PF", "label": "French Polynesia (3 Cities)" }, { "value": "TF", "label": "French Southern Territories (1 City)" }, { "value": "GA", "label": "Gabon (9 Cities)" }, { "value": "GM", "label": "Gambia (7 Cities)" }, { "value": "GE", "label": "Georgia (21 Cities)" }, { "value": "DE", "label": "Germany (1109 Cities)" }, { "value": "GH", "label": "Ghana (61 Cities)" }, { "value": "GI", "label": "Gibraltar (1 City)" }, { "value": "GR", "label": "Greece (113 Cities)" }, { "value": "GL", "label": "Greenland (1 City)" }, { "value": "GD", "label": "Grenada (1 City)" }, { "value": "GP", "label": "Guadeloupe (10 Cities)" }, { "value": "GU", "label": "Guam (7 Cities)" }, { "value": "GT", "label": "Guatemala (102 Cities)" }, { "value": "GG", "label": "Guernsey (1 City)" }, { "value": "GN", "label": "Guinea (19 Cities)" }, { "value": "GW", "label": "Guinea-Bissau (2 Cities)" }, { "value": "GY", "label": "Guyana (3 Cities)" }, { "value": "HT", "label": "Haiti (26 Cities)" }, { "value": "HN", "label": "Honduras (24 Cities)" }, { "value": "HK", "label": "Hong Kong (19 Cities)" }, { "value": "HU", "label": "Hungary (114 Cities)" }, { "value": "IS", "label": "Iceland (6 Cities)" }, { "value": "IN", "label": "India (2408 Cities)" }, { "value": "ID", "label": "Indonesia (400 Cities)" }, { "value": "IR", "label": "Iran (202 Cities)" }, { "value": "IQ", "label": "Iraq (72 Cities)" }, { "value": "IE", "label": "Ireland (39 Cities)" }, { "value": "IM", "label": "Isle of Man (1 City)" }, { "value": "IL", "label": "Israel (103 Cities)" }, { "value": "IT", "label": "Italy (613 Cities)" }, { "value": "CI", "label": "Ivory Coast (60 Cities)" }, { "value": "JM", "label": "Jamaica (11 Cities)" }, { "value": "JP", "label": "Japan (828 Cities)" }, { "value": "JE", "label": "Jersey (1 City)" }, { "value": "JO", "label": "Jordan (27 Cities)" }, { "value": "KZ", "label": "Kazakhstan (77 Cities)" }, { "value": "KE", "label": "Kenya (58 Cities)" }, { "value": "KI", "label": "Kiribati (1 City)" }, { "value": "XK", "label": "Kosovo (21 Cities)" }, { "value": "KW", "label": "Kuwait (18 Cities)" }, { "value": "KG", "label": "Kyrgyzstan (30 Cities)" }, { "value": "LA", "label": "Laos (11 Cities)" }, { "value": "LV", "label": "Latvia (14 Cities)" }, { "value": "LB", "label": "Lebanon (14 Cities)" }, { "value": "LS", "label": "Lesotho (9 Cities)" }, { "value": "LR", "label": "Liberia (10 Cities)" }, { "value": "LY", "label": "Libya (43 Cities)" }, { "value": "LI", "label": "Liechtenstein (1 City)" }, { "value": "LT", "label": "Lithuania (36 Cities)" }, { "value": "LU", "label": "Luxembourg (3 Cities)" }, { "value": "MO", "label": "Macao (1 City)" }, { "value": "MG", "label": "Madagascar (84 Cities)" }, { "value": "MW", "label": "Malawi (17 Cities)" }, { "value": "MY", "label": "Malaysia (142 Cities)" }, { "value": "MV", "label": "Maldives (1 City)" }, { "value": "ML", "label": "Mali (21 Cities)" }, { "value": "MT", "label": "Malta (7 Cities)" }, { "value": "MH", "label": "Marshall Islands (2 Cities)" }, { "value": "MQ", "label": "Martinique (8 Cities)" }, { "value": "MR", "label": "Mauritania (14 Cities)" }, { "value": "MU", "label": "Mauritius (13 Cities)" }, { "value": "YT", "label": "Mayotte (3 Cities)" }, { "value": "MX", "label": "Mexico (620 Cities)" }, { "value": "FM", "label": "Micronesia (1 City)" }, { "value": "MD", "label": "Moldova (21 Cities)" }, { "value": "MC", "label": "Monaco (2 Cities)" }, { "value": "MN", "label": "Mongolia (22 Cities)" }, { "value": "ME", "label": "Montenegro (8 Cities)" }, { "value": "MS", "label": "Montserrat (2 Cities)" }, { "value": "MA", "label": "Morocco (85 Cities)" }, { "value": "MZ", "label": "Mozambique (26 Cities)" }, { "value": "MM", "label": "Myanmar (67 Cities)" }, { "value": "NA", "label": "Namibia (14 Cities)" }, { "value": "NR", "label": "Nauru (1 City)" }, { "value": "NP", "label": "Nepal (43 Cities)" }, { "value": "NL", "label": "Netherlands (228 Cities)" }, { "value": "NC", "label": "New Caledonia (3 Cities)" }, { "value": "NZ", "label": "New Zealand (55 Cities)" }, { "value": "NI", "label": "Nicaragua (36 Cities)" }, { "value": "NE", "label": "Niger (25 Cities)" }, { "value": "NG", "label": "Nigeria (244 Cities)" }, { "value": "NU", "label": "Niue (1 City)" }, { "value": "NF", "label": "Norfolk Island (1 City)" }, { "value": "MP", "label": "Northern Mariana Islands (1 City)" }, { "value": "KP", "label": "North Korea (59 Cities)" }, { "value": "MK", "label": "North Macedonia (37 Cities)" }, { "value": "NO", "label": "Norway (39 Cities)" }, { "value": "OM", "label": "Oman (26 Cities)" }, { "value": "PK", "label": "Pakistan (315 Cities)" }, { "value": "PW", "label": "Palau (1 City)" }, { "value": "PS", "label": "Palestinian Territory (43 Cities)" }, { "value": "PA", "label": "Panama (26 Cities)" }, { "value": "PG", "label": "Papua New Guinea (13 Cities)" }, { "value": "PY", "label": "Paraguay (26 Cities)" }, { "value": "PE", "label": "Peru (130 Cities)" }, { "value": "PH", "label": "Philippines (438 Cities)" }, { "value": "PN", "label": "Pitcairn (1 City)" }, { "value": "PL", "label": "Poland (333 Cities)" }, { "value": "PT", "label": "Portugal (140 Cities)" }, { "value": "PR", "label": "Puerto Rico (21 Cities)" }, { "value": "QA", "label": "Qatar (5 Cities)" }, { "value": "CG", "label": "Republic of the Congo (12 Cities)" }, { "value": "RE", "label": "Reunion (14 Cities)" }, { "value": "RO", "label": "Romania (134 Cities)" }, { "value": "RU", "label": "Russia (1077 Cities)" }, { "value": "RW", "label": "Rwanda (11 Cities)" }, { "value": "BL", "label": "Saint Barthelemy (1 City)" }, { "value": "SH", "label": "Saint Helena (1 City)" }, { "value": "KN", "label": "Saint Kitts and Nevis (1 City)" }, { "value": "LC", "label": "Saint Lucia (1 City)" }, { "value": "MF", "label": "Saint Martin (1 City)" }, { "value": "PM", "label": "Saint Pierre and Miquelon (1 City)" }, { "value": "VC", "label": "Saint Vincent and the Grenadines (2 Cities)" }, { "value": "WS", "label": "Samoa (1 City)" }, { "value": "SM", "label": "San Marino (1 City)" }, { "value": "ST", "label": "Sao Tome and Principe (1 City)" }, { "value": "SA", "label": "Saudi Arabia (63 Cities)" }, { "value": "SN", "label": "Senegal (31 Cities)" }, { "value": "RS", "label": "Serbia (48 Cities)" }, { "value": "SC", "label": "Seychelles (1 City)" }, { "value": "SL", "label": "Sierra Leone (12 Cities)" }, { "value": "SG", "label": "Singapore (5 Cities)" }, { "value": "SX", "label": "Sint Maarten (1 City)" }, { "value": "SK", "label": "Slovakia (53 Cities)" }, { "value": "SI", "label": "Slovenia (9 Cities)" }, { "value": "SB", "label": "Solomon Islands (1 City)" }, { "value": "SO", "label": "Somalia (33 Cities)" }, { "value": "ZA", "label": "South Africa (169 Cities)" }, { "value": "GS", "label": "South Georgia and the South Sandwich Islands (1 City)" }, { "value": "KR", "label": "South Korea (125 Cities)" }, { "value": "SS", "label": "South Sudan (16 Cities)" }, { "value": "ES", "label": "Spain (624 Cities)" }, { "value": "LK", "label": "Sri Lanka (54 Cities)" }, { "value": "SD", "label": "Sudan (48 Cities)" }, { "value": "SR", "label": "Suriname (2 Cities)" }, { "value": "SJ", "label": "Svalbard and Jan Mayen (1 City)" }, { "value": "SE", "label": "Sweden (106 Cities)" }, { "value": "CH", "label": "Switzerland (86 Cities)" }, { "value": "SY", "label": "Syria (76 Cities)" }, { "value": "TW", "label": "Taiwan (31 Cities)" }, { "value": "TJ", "label": "Tajikistan (27 Cities)" }, { "value": "TZ", "label": "Tanzania (185 Cities)" }, { "value": "TH", "label": "Thailand (222 Cities)" }, { "value": "TL", "label": "Timor Leste (9 Cities)" }, { "value": "TG", "label": "Togo (17 Cities)" }, { "value": "TO", "label": "Tonga (1 City)" }, { "value": "TT", "label": "Trinidad and Tobago (13 Cities)" }, { "value": "TN", "label": "Tunisia (74 Cities)" }, { "value": "TR", "label": "Turkey (391 Cities)" }, { "value": "TM", "label": "Turkmenistan (24 Cities)" }, { "value": "TC", "label": "Turks and Caicos Islands (1 City)" }, { "value": "TV", "label": "Tuvalu (1 City)" }, { "value": "UG", "label": "Uganda (48 Cities)" }, { "value": "UA", "label": "Ukraine (254 Cities)" }, { "value": "AE", "label": "United Arab Emirates (19 Cities)" }, { "value": "GB", "label": "United Kingdom (823 Cities)" }, { "value": "US", "label": "United States (2829 Cities)" }, { "value": "UY", "label": "Uruguay (31 Cities)" }, { "value": "VI", "label": "U.S. Virgin Islands (2 Cities)" }, { "value": "UZ", "label": "Uzbekistan (103 Cities)" }, { "value": "VU", "label": "Vanuatu (1 City)" }, { "value": "VA", "label": "Vatican (1 City)" }, { "value": "VE", "label": "Venezuela (207 Cities)" }, { "value": "VN", "label": "Vietnam (116 Cities)" }, { "value": "WF", "label": "Wallis and Futuna (1 City)" }, { "value": "EH", "label": "Western Sahara (3 Cities)" }, { "value": "YE", "label": "Yemen (23 Cities)" }, { "value": "ZM", "label": "Zambia (29 Cities)" }, { "value": "ZW", "label": "Zimbabwe (28 Cities)" }]

function fixupdatebugs(controls) {
    if (typeof controls.numberGreaterThanOrEqualToOne === 'function') {
        controls.greaterThanOrEqualToOne = controls.numberGreaterThanOrEqualToOne
        controls.greaterThanOrEqualToZero = controls.numberGreaterThanOrEqualToZero
        
    } else {
        controls.numberGreaterThanOrEqualToOne = controls.greaterThanOrEqualToOne
        controls.numberGreaterThanOrEqualToZero = controls.greaterThanOrEqualToZero 
    }
}
/**
 * @param {Controls} controls
 */
function getInput(controls) {
    const hasCountry = (data) => data['country']
    controls
        .listOfTexts('queries', {
            isDisabled: hasCountry,
            defaultValue: ["Web Developers in Bangalore"],
            placeholder: "Web Developers in Bangalore",
            label: 'Search Queries', 
            isRequired: true
        })
        .section("Extract Cities By Country", (section) => {
            fixupdatebugs(section)
            section
                .select('country', {
                    options: CountryOptions,
                })
                .text('business_type', {
                    placeholder: "Web Developers",
                    isRequired: hasCountry
                }
                )
                .greaterThanOrEqualToOne('max_cities', {
                    placeholder: 100,
                    label: 'Maximum Cities to Extract (Leave empty to extract all cities in a country)'
                }).switch('randomize_cities'  , {
                    defaultValue:true, 
                    label:"Randomize Cities (Recommended)",
                    helpText:"When multiple users are targeting the same places in the same cities, it reduces the opportunity for each individual user to make a sale. By randomizing cities, it spreads the places across different locations, giving each user a better chance to make a sale."
                })
        })
        .section("Email and Social Links Extraction", (section) => {
            section.text('api_key', {
                placeholder: "2e5d346ap4db8mce4fj7fc112s9h26s61e1192b6a526af51n9",
                label: 'Email and Social Links Extraction API Key',
                helpText: 'Enter your API key to extract email addresses and social media links.',
            })
        })
        .section("Reviews Extraction", (section) => {

            fixupdatebugs(section)

            section
                .switch('enable_reviews_extraction', {
                    label: "Enable Reviews Extraction"
                })
                .numberGreaterThanOrEqualToZero('max_reviews', {
                    label: 'Max Reviews per Place (Leave empty to extract all reviews)',
                    placeholder: 20,
                     isShown: (data) => data['enable_reviews_extraction'], defaultValue: 20,
                })
                .choose('reviews_sort', {
                    label: "Sort Reviews By",
                    isRequired: true, isShown: (data) => data['enable_reviews_extraction'], defaultValue: 'newest', options: [{ value: 'newest', label: 'Newest' }, { value: 'most_relevant', label: 'Most Relevant' }, { value: 'highest_rating', label: 'Highest Rating' }, { value: 'lowest_rating', label: 'Lowest Rating' }]
                })
        })
        .section("Language and Max Results", (section) => {

            fixupdatebugs(section)

            section
                .addLangSelect()
                .numberGreaterThanOrEqualToOne('max_results', {
                    placeholder: 100,
                    label: 'Max Results per Search Query (Leave empty to extract all places)'
                })
        })
        .section("Geo Location", (section) => {

            fixupdatebugs(section)

            section
                .text('coordinates', {
                    placeholder: '12.900490, 77.571466'
                })
                .numberGreaterThanOrEqualToOne('zoom_level', {
                    label: 'Zoom Level (1-21)',
                    defaultValue: 14,
                    placeholder: 14
                })
        })
}

