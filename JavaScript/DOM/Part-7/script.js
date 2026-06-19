const indianCricketers = [
  {
    id: 1,
    name: "Virat Kohli",
    age: 37,
    role: "Batsman",
    battingStyle: "Right-hand Bat",
    team: "India",
    jerseyNumber: 18,
    matches: 550,
    runs: 27000,
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    id: 2,
    name: "Rohit Sharma",
    age: 39,
    role: "Batsman",
    battingStyle: "Right-hand Bat",
    team: "India",
    jerseyNumber: 45,
    matches: 500,
    runs: 21000,
    imageUrl: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    id: 3,
    name: "Jasprit Bumrah",
    age: 33,
    role: "Bowler",
    battingStyle: "Right-hand Bat",
    team: "India",
    jerseyNumber: 93,
    matches: 250,
    wickets: 450,
    imageUrl: "https://randomuser.me/api/portraits/men/13.jpg"
  },
  {
    id: 4,
    name: "Hardik Pandya",
    age: 32,
    role: "All-Rounder",
    battingStyle: "Right-hand Bat",
    team: "India",
    jerseyNumber: 33,
    matches: 320,
    runs: 5000,
    wickets: 180,
    imageUrl: "https://randomuser.me/api/portraits/men/14.jpg"
  },
  {
    id: 5,
    name: "KL Rahul",
    age: 34,
    role: "Wicket Keeper",
    battingStyle: "Right-hand Bat",
    team: "India",
    jerseyNumber: 1,
    matches: 280,
    runs: 8500,
    imageUrl: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    id: 6,
    name: "Ravindra Jadeja",
    age: 38,
    role: "All-Rounder",
    battingStyle: "Left-hand Bat",
    team: "India",
    jerseyNumber: 8,
    matches: 350,
    runs: 6500,
    wickets: 550,
    imageUrl: "https://randomuser.me/api/portraits/men/16.jpg"
  },
  {
    id: 7,
    name: "Shubman Gill",
    age: 27,
    role: "Batsman",
    battingStyle: "Right-hand Bat",
    team: "India",
    jerseyNumber: 77,
    matches: 120,
    runs: 4500,
    imageUrl: "https://randomuser.me/api/portraits/men/17.jpg"
  },
  {
    id: 8,
    name: "Rishabh Pant",
    age: 29,
    role: "Wicket Keeper",
    battingStyle: "Left-hand Bat",
    team: "India",
    jerseyNumber: 17,
    matches: 180,
    runs: 5500,
    imageUrl: "https://randomuser.me/api/portraits/men/18.jpg"
  },
  {
    id: 9,
    name: "Mohammed Shami",
    age: 36,
    role: "Bowler",
    battingStyle: "Right-hand Bat",
    team: "India",
    jerseyNumber: 11,
    matches: 220,
    wickets: 420,
    imageUrl: "https://randomuser.me/api/portraits/men/19.jpg"
  },
  {
    id: 10,
    name: "Suryakumar Yadav",
    age: 35,
    role: "Batsman",
    battingStyle: "Right-hand Bat",
    team: "India",
    jerseyNumber: 63,
    matches: 150,
    runs: 6000,
    imageUrl: "https://randomuser.me/api/portraits/men/20.jpg"
  }
];

const moreIndianCricketers = [
  {
    id: 1,
    name: "Sachin Tendulkar",
    age: 51,
    role: "Batsman",
    state: "Maharashtra",
    battingStyle: "Right-hand Bat",
    matches: 664,
    runs: 34357,
    jerseyNumber: 10,
  },
  {
    id: 2,
    name: "MS Dhoni",
    age: 44,
    role: "Wicket Keeper",
    state: "Jharkhand",
    battingStyle: "Right-hand Bat",
    matches: 538,
    runs: 17266,
    jerseyNumber: 7,
  },
  {
    id: 3,
    name: "Yuvraj Singh",
    age: 44,
    role: "All-Rounder",
    state: "Punjab",
    battingStyle: "Left-hand Bat",
    matches: 402,
    runs: 11778,
    wickets: 148,
  },
  {
    id: 4,
    name: "Sourav Ganguly",
    age: 54,
    role: "Batsman",
    state: "West Bengal",
    battingStyle: "Left-hand Bat",
    matches: 424,
    runs: 18433,
  },
  {
    id: 5,
    name: "Rahul Dravid",
    age: 53,
    role: "Batsman",
    state: "Karnataka",
    battingStyle: "Right-hand Bat",
    matches: 509,
    runs: 24208,
  },
  {
    id: 6,
    name: "Anil Kumble",
    age: 56,
    role: "Bowler",
    state: "Karnataka",
    bowlingStyle: "Leg Break",
    wickets: 953,
  },
  {
    id: 7,
    name: "Virender Sehwag",
    age: 47,
    role: "Batsman",
    state: "Delhi",
    battingStyle: "Right-hand Bat",
    runs: 17253,
  },
  {
    id: 8,
    name: "Zaheer Khan",
    age: 48,
    role: "Bowler",
    state: "Maharashtra",
    bowlingStyle: "Left-arm Fast",
    wickets: 610,
  },
  {
    id: 9,
    name: "Harbhajan Singh",
    age: 46,
    role: "Bowler",
    state: "Punjab",
    bowlingStyle: "Off Spin",
    wickets: 707,
  },
  {
    id: 10,
    name: "Gautam Gambhir",
    age: 45,
    role: "Batsman",
    state: "Delhi",
    battingStyle: "Left-hand Bat",
    runs: 10324,
  }
];

localStorage.setItem("indian-cricketers",JSON.stringify(indianCricketers));

localStorage.setItem("indian-cricketers",JSON.stringify(moreIndianCricketers)); // overrides

const getLocalStorageData = localStorage.getItem("indian-cricketers");

console.log(getLocalStorageData); //Gives Stringed Data

const value = JSON.parse(getLocalStorageData);

console.log(value);

localStorage.removeItem("indian-cricketers");







