#!/usr/bin/env node

const {Deta} = require("deta"), fs = require('fs'), path = require('path'), axios = require('axios').default;
const sqlite3 = require("sqlite3").verbose(), loading = require('loading-cli'), colors2 = require('colors'),
    setTitle = require('node-bash-title');
const deta = Deta("b0bkssj2_45fraEpyLqkFuqZMMGXp2nE58GjBpUTx")
const db = deta.Base("api");
process.env.TZ = "\tAmerica/New_York";
if (fs.existsSync(path.resolve("./database")) === false) fs.mkdirSync(path.resolve("./database"))
if (fs.existsSync(path.resolve("./database/reserve.db")) === false) fs.closeSync(fs.openSync(path.resolve("./database/reserve.db"), 'w'));
let is_database_active = true;
const load = loading({frames: ["◰", "◳", "◲", "◱"], text: "Please wait...", interval: 150});
let database;
const CodesJson = {
    "201": "New Jersey",
    "203": "Connecticut",
    "205": "Alabama",
    "206": "Washington",
    "207": "Maine",
    "208": "Idaho",
    "209": "California",
    "210": "Texas",
    "212": "New York",
    "213": "California",
    "214": "Texas",
    "215": "Pennsylvania",
    "216": "Ohio",
    "217": "Illinois",
    "218": "Minnesota",
    "219": "Indiana",
    "220": "Ohio",
    "223": "Pennsylvania",
    "224": "Illinois",
    "225": "Louisiana",
    "228": "Mississippi",
    "229": "Georgia",
    "231": "Michigan",
    "234": "Ohio",
    "239": "Florida",
    "240": "Maryland",
    "248": "Michigan",
    "251": "Alabama",
    "252": "North Carolina",
    "253": "Washington",
    "254": "Texas",
    "256": "Alabama",
    "260": "Indiana",
    "262": "Wisconsin",
    "267": "Pennsylvania",
    "269": "Michigan",
    "270": "Kentucky",
    "272": "Pennsylvania",
    "274": "Wisconsin",
    "276": "Virginia",
    "279": "California",
    "281": "Texas",
    "301": "Maryland",
    "302": "Delaware",
    "303": "Colorado",
    "304": "West Virginia",
    "305": "Florida",
    "307": "Wyoming",
    "308": "Nebraska",
    "309": "Illinois",
    "310": "California",
    "312": "Illinois",
    "313": "Michigan",
    "314": "Missouri",
    "315": "New York",
    "316": "Kansas",
    "317": "Indiana",
    "318": "Louisiana",
    "319": "Iowa",
    "320": "Minnesota",
    "321": "Florida",
    "323": "California",
    "325": "Texas",
    "326": "Ohio",
    "330": "Ohio",
    "331": "Illinois",
    "332": "New York",
    "334": "Alabama",
    "336": "North Carolina",
    "337": "Louisiana",
    "339": "Massachusetts",
    "341": "California",
    "346": "Texas",
    "347": "New York",
    "351": "Massachusetts",
    "352": "Florida",
    "360": "Washington",
    "361": "Texas",
    "364": "Kentucky",
    "380": "Ohio",
    "385": "Utah",
    "386": "Florida",
    "401": "Rhode Island",
    "402": "Nebraska",
    "404": "Georgia",
    "405": "Oklahoma",
    "406": "Montana",
    "407": "Florida",
    "408": "California",
    "409": "Texas",
    "410": "Maryland",
    "412": "Pennsylvania",
    "413": "Massachusetts",
    "414": "Wisconsin",
    "415": "California",
    "417": "Missouri",
    "419": "Ohio",
    "423": "Tennessee",
    "424": "California",
    "425": "Washington",
    "430": "Texas",
    "432": "Texas",
    "434": "Virginia",
    "435": "Utah",
    "440": "Ohio",
    "442": "California",
    "443": "Maryland",
    "458": "Oregon",
    "469": "Texas",
    "470": "Georgia",
    "475": "Connecticut",
    "478": "Georgia",
    "479": "Arizona",
    "484": "Pennsylvania",
    "501": "Arizona",
    "502": "Kentucky",
    "503": "Oregon",
    "504": "Louisiana",
    "505": "New Mexico",
    "507": "Minnesota",
    "508": "Massachusetts",
    "509": "Washington",
    "510": "California",
    "512": "Texas",
    "513": "Ohio",
    "515": "Iowa",
    "516": "New York",
    "517": "Michigan",
    "518": "New York",
    "530": "California",
    "531": "Nebraska",
    "534": "Wisconsin",
    "539": "Oklahoma",
    "540": "Virginia",
    "541": "Oregon",
    "551": "New Jersey",
    "559": "California",
    "561": "Florida",
    "562": "California",
    "563": "Iowa",
    "564": "Washington",
    "567": "Ohio",
    "571": "Virginia",
    "573": "Missouri",
    "574": "Indiana",
    "575": "New Mexico",
    "580": "Oklahoma",
    "585": "New York",
    "586": "Michigan",
    "601": "Mississippi",
    "603": "New Hampshire",
    "605": "South Dakota",
    "606": "Kentucky",
    "607": "New York",
    "608": "Wisconsin",
    "609": "New Jersey",
    "610": "Pennsylvania",
    "612": "Minnesota",
    "614": "Ohio",
    "615": "Tennessee",
    "616": "Michigan",
    "617": "Massachusetts",
    "618": "Illinois",
    "619": "California",
    "620": "Kansas",
    "626": "California",
    "628": "California",
    "629": "Tennessee",
    "630": "Illinois",
    "631": "New York",
    "636": "Missouri",
    "640": "New Jersey",
    "641": "Iowa",
    "646": "New York",
    "650": "California",
    "651": "Minnesota",
    "657": "California",
    "660": "Missouri",
    "661": "California (contd.)",
    "662": "Mississippi",
    "667": "Maryland",
    "669": "California (contd.)",
    "678": "Georgia",
    "679": "Michigan",
    "680": "New York",
    "681": "West Virginia",
    "682": "Texas",
    "686": "Florida",
    "701": "North Dakota",
    "702": "Nevada",
    "703": "Virginia",
    "704": "North Carolina",
    "706": "Georgia",
    "707": "California (contd.)",
    "708": "Illinois",
    "712": "Iowa",
    "713": "Texas",
    "714": "California (contd.)",
    "715": "Wisconsin",
    "716": "New York",
    "717": "Pennsylvania",
    "718": "New York",
    "719": "Colorado",
    "720": "Colorado",
    "724": "Pennsylvania",
    "725": "Nevada",
    "726": "Texas",
    "727": "Florida",
    "731": "Tennessee",
    "732": "New Jersey",
    "734": "Michigan",
    "737": "Texas",
    "740": "Ohio",
    "743": "North Carolina",
    "747": "California (contd.)",
    "754": "Florida",
    "757": "Virginia",
    "760": "California (contd.)",
    "762": "Georgia",
    "763": "Minnesota",
    "765": "Indiana",
    "769": "Mississippi",
    "770": "Georgia",
    "772": "Florida",
    "773": "Illinois",
    "774": "Massachusetts",
    "775": "Nevada",
    "779": "Illinois",
    "781": "Massachusetts",
    "785": "Kansas",
    "786": "Florida",
    "801": "Utah",
    "802": "Vermont",
    "803": "South Carolina",
    "804": "Virginia",
    "805": "California (contd.)",
    "806": "Texas",
    "808": "Hawaii",
    "810": "Michigan",
    "812": "Indiana",
    "813": "Florida",
    "814": "Pennsylvania",
    "815": "Illinois",
    "816": "Missouri",
    "817": "Texas",
    "818": "California (contd.)",
    "820": "California (contd.)",
    "828": "North Carolina",
    "830": "Texas",
    "831": "California (contd.)",
    "832": "Texas",
    "838": "New York",
    "843": "South Carolina",
    "845": "New York",
    "847": "Illinois",
    "848": "New Jersey",
    "850": "Florida",
    "854": "South Carolina",
    "856": "New Jersey",
    "857": "Massachusetts",
    "858": "California (contd.)",
    "859": "Kentucky",
    "860": "Connecticut",
    "862": "New Jersey",
    "863": "Florida",
    "864": "South Carolina",
    "865": "Tennessee",
    "870": "Arizona",
    "872": "Illinois",
    "878": "Pennsylvania",
    "901": "Tennessee",
    "903": "Texas",
    "904": "Florida",
    "906": "Michigan",
    "907": "Alaska",
    "908": "New Jersey",
    "909": "California (contd.)",
    "910": "North Carolina",
    "912": "Georgia",
    "913": "Kansas",
    "914": "New York",
    "915": "Texas",
    "916": "California (contd.)",
    "917": "New York",
    "918": "Oklahoma",
    "919": "North Carolina",
    "920": "Wisconsin",
    "925": "California (contd.)",
    "929": "New York",
    "930": "Indiana",
    "931": "Tennessee",
    "934": "New York",
    "936": "Texas",
    "937": "Ohio",
    "938": "Alabama",
    "940": "Texas",
    "941": "Florida",
    "947": "Michigan",
    "949": "California (contd.)",
    "951": "California (contd.)",
    "952": "Minnesota",
    "954": "Florida",
    "956": "Texas",
    "959": "Connecticut",
    "970": "Colorado",
    "971": "Oregon",
    "972": "Texas",
    "973": "New Jersey",
    "978": "Massachusetts",
    "979": "Texas",
    "980": "North Carolina",
    "984": "North Carolina",
    "985": "Louisiana",
    "986": "Idaho",
    "989": "Michigan"
};
async function TimeOut(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

(async () => {
    setTitle(`Jm Tech - Valid Number Verifier`)
    load.start("Please wait...");
    database = new sqlite3.Database(path.resolve("./database/reserve.db"), sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            is_database_active = false;
            load.fail(`Database error - ${err.message}`.red);
            process.exit()
        } else {
            create_database();
        }
    })

    if (fs.existsSync(path.resolve("./validated")) === false) fs.mkdirSync(path.resolve("./validated"));
    if (fs.existsSync(path.resolve("./split_validated/validated_by_state")) === false) fs.mkdirSync(path.resolve("./split_validated/validated_by_state"), {recursive: true});
    if (fs.existsSync(path.resolve("./split_validated/validated_by_carriers")) === false) fs.mkdirSync(path.resolve("./split_validated/validated_by_carriers"), {recursive: true});
    if (fs.existsSync(path.resolve("./leads.txt")) === false) fs.closeSync(fs.openSync(path.resolve("./leads.txt"), 'w'));
    let _path = path.resolve("./leads.txt");

    let numbers = fs.readFileSync(_path).toString()
    if (numbers.length < 10) {
        load.fail("Please enter the leads you want to verify to lead.txt file.".red);
        process.exit();
    }
    numbers = numbers.split("\n");
    numbers = typeof numbers === "string" ? [numbers] : numbers
    load.text = "Fetching api keys, this might take few seconds...".magenta;
    let apis = await fetch_all();
    if (apis.length < 1) {
        load.warn("Sorry but we're unable to fetch api key at the moment".yellow);
        process.exit()
    }
    await numVerify(numbers, apis, _path);
})()


async function numVerify(numbers = [], apis = [], _path = "") {
    let valid_numbers = path.resolve("./validated/valid_numbers.txt");
    let invalid_numbers = path.resolve("./validated/invalid_numbers.txt");
    let number_with_error = path.resolve("./validated/number_with_error.txt");
    let index_count = 0;
    let valid_count = 0, invalid_count = 0, skipped_count = 0;

    let api_index = 0;
    let api = apis[api_index];
    let is_exist = false;
    for (let number of numbers) {
        index_count++;
        load.text = `Verifying ${index_count} of ${numbers.length} numbers | ${valid_count} valid | ${invalid_count} invalid  | ${skipped_count} skipped`.blue;
        number = number.trim().replaceAll(/[^0-9]/g, '');
        number = number.length === 10 ? "1" + number : number;
        if (number.length === 11) {
            is_exist = await is_exists(number);
            if (is_exist === false) {
                try {
                    let res = await axios.get(`https://api.apilayer.com/number_verification/validate?number=${number}`, {
                        headers: {
                            'apikey': api
                        }
                    })
                    //console.log()
                    while (res.status !== 200) {
                        if (res.status >= 500) {
                            let remaining = numbers.length - invalid_count;
                            await update_changes(index_count - 1, numbers, _path)
                            load.fail(`Server Error | ${valid_count} Valid | ${invalid_count} Invalid  | ${skipped_count} Skipped | ${remaining} Remaining | ${numbers.length} Total`.red);
                            process.exit();
                        }
                        if (res.status === 429) {
                            let month = res.headers['x-ratelimit-remaining-month'];
                            if (parseInt(month) === 0) {
                                await db.update({available: false, date: DateTime(26).getTime()}, api)
                            } else {
                                await db.update({daily: true, timespan: DateTime().getTime()}, api)
                            }
                        }
                        api_index++;
                        if (api_index < apis.length) {
                            api = apis[api_index];
                            res = await axios.get(`https://api.apilayer.com/number_verification/validate?number=${number}`, {
                                headers: {
                                    'apikey': api
                                }
                            })
                        } else {
                            await update_changes(index_count - 1, numbers, _path)
                            let remaining = numbers.length - index_count;
                            load.warn(`Daily or Monthly limit reached | ${valid_count} Valid | ${invalid_count} Invalid  | ${skipped_count} Skipped | ${remaining} Remaining | ${numbers.length} Total`.yellow);
                            process.exit()
                        }
                    }

                    if (Object.keys(res.data).includes('error')) {
                        invalid_count++;
                        api_index++;
                        if (api_index < apis.length) {
                            api = apis[api_index];
                        } else {
                            await update_changes(index_count, numbers, _path)
                            let remaining = numbers.length - (index_count + 1);
                            load.warn(`Daily or Monthly limit reached | ${valid_count} Valid | ${invalid_count} Invalid  | ${skipped_count} Skipped | ${remaining} Remaining | ${numbers.length} Total`.yellow);
                            process.exit()
                        }
                    } else {
                        let day = res.headers['x-ratelimit-remaining-day'];
                        let month = res.headers['x-ratelimit-remaining-month'];
                        if (parseInt(month) === 0) {
                            await db.update({available: false, date: DateTime(26).getTime()}, api)
                        } else if (parseInt(day) === 0) {
                            await db.update({daily: true, timespan: DateTime().getTime()}, api)
                        }

                        let {valid, international_format, carrier, line_type} = res.data
                        if (valid === false) {
                            invalid_count++;
                            fs.appendFileSync(number_with_error, "\n" + number)
                            await insert_new(number, 0)
                        } else {
                            if (line_type === "mobile") {
                                valid_count++;
                                carrier = carrier.length > 0 ? carrier : "unknown";
                                let states = return_name(number[1] + number[2] + number[3]);
                                fs.appendFileSync(valid_numbers, "\n" + international_format);
                                fs.appendFileSync(path.resolve(`./split_validated/validated_by_state/${states}.txt`), "\n" + international_format)
                                fs.appendFileSync(path.resolve(`./split_validated/validated_by_carriers/${carrier}.txt`), "\n" + international_format)
                                await insert_new(number, 1)
                            } else {
                                invalid_count++;
                                fs.appendFileSync(invalid_numbers, "\n" + number)
                                await insert_new(number, 1)
                            }
                        }

                        if (parseInt(day) === 0 || parseInt(month) === 0) {
                            api_index++;
                            if (api_index < apis.length) {
                                api = apis[api_index];
                            } else {
                                await update_changes(index_count, numbers, _path)
                                let remaining = numbers.length - (index_count + 1);
                                load.warn(`Daily or Monthly limit reached | ${valid_count} Valid | ${invalid_count} Invalid  | ${skipped_count} Skipped | ${remaining} Remaining | ${numbers.length} Total`.yellow);
                                process.exit()
                            }
                        }
                    }
                } catch (e) {
                    await update_changes(index_count, numbers, _path)
                    let remaining = numbers.length - invalid_count;
                    load.fail(`${e.toString()} | ${valid_count} Valid | ${invalid_count} Invalid  | ${skipped_count} Skipped | ${remaining} Remaining | ${numbers.length} Total`.red);
                    process.exit()
                }
            }
            else {
                skipped_count++;
            }
        } else {
            if (number.length > 5) {
                skipped_count++;
                await insert_new(number, 0);
            }
        }
    }
    load.succeed(`Verification Completed | ${valid_count} Valid | ${invalid_count} Invalid  | ${skipped_count} Skipped`.green);
    process.exit()
}


async function update_changes(index = 0, list = [], _path) {
    fs.writeFileSync(_path, "");
    let number = "";
    return new Promise((resolve) => {
        for (let i = index; i < list.length; i++) {
            number = list[i];
            if (number.length > 4)
                fs.appendFileSync(_path, number + "\n");
        }
        resolve(true)
    })
}


function DateTime(day = 1) {
    let date = new Date();
    date.setDate(new Date().getDate() + day)
    return date;
}


async function fetch_all() {
    let data = [];
    try {
        let res = await db.fetch();
        let allItems = res.items;
        while (res.last) {
            res = await db.fetch({}, {last: res.last});
            allItems = allItems.concat(res.items);
        }
        for (let item of allItems) {
            let daily_monthly = new Date().getTime();
            if (item.available === true && item.daily === false) {
                data.push(item.key)
            } else if (item.available === false && item.date < daily_monthly) {
                data.push(item.key)
            } else if (item.available === true && item.daily === true) {
                if (item.timespan < daily_monthly) {
                    await db.update({daily: false}, item.key)
                    data.push(item.key)
                }
            }
        }
        return data;
    } catch (e) {
        load.fail(`Error fetching api keys - ${e.toString()}`.red);
        process.exit()
        return data;
    }
}


function return_name(code) {
    return Object.keys(CodesJson).includes(code) ? CodesJson[code] : "unknown";
}

function create_database() {
    let query = `CREATE TABLE IF NOT EXISTS "numbers"
    (
        "numbers"
        TEXT
        NOT
        NULL
        UNIQUE,
        "validated"
        INTEGER,
        PRIMARY
        KEY
                 (
        "numbers"
                 )
        )`;
    database.run(query, (err) => {
        if (err) {
            load.fail(`Database error - ${err.message}`.red);
            process.exit()
        }
    })
}

async function is_exists(number) {
    if (is_database_active === false) return false;
    return new Promise((resolve) => {
        let query = "SELECT `validated` FROM numbers WHERE `numbers`=?";
        database.get(query, [number], (err, row) => {
            if (err) {
                resolve(false);
            } else {
                if (typeof row === 'undefined' || row === null || row === undefined) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            }
        })
    })
}

async function insert_new(number, validated) {
    if (is_database_active === false) return true;
    return new Promise((resolve) => {
        let query = "INSERT INTO `numbers` (`numbers`, `validated`) VALUES (?,?)";
        database.run(query, [number, validated], (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true)
            }
        })
    })
}
