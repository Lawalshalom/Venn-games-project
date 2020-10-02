const string = `2
1 PT
2 US
3
1 1 10
2 1 5
3 2 10
`

function analyzeTasks(string){
    const multiLine = string.split('\n');
    const N = Number.parseFloat(multiLine[0]);
    const users = [];

    for (let i = 1; i <= N; i++){
        let username = 'user' + i;
        let userDetails = multiLine[i].split(' ');
        let userId = userDetails[0];
        let userCountry = userDetails[1]

        let user = {
            username,
            userId,
            userCountry
        }
         users.push(user)
    };

    const T = multiLine[N+1];
    const taskDetails = [];
    for (let i = 1; i <= Number.parseFloat(T); i++) {
       let taskName = 'task' + i;
       let taskDetail = multiLine[N + +1 + i].split(' ');
       let taskId = taskDetail[0];
       let userId = taskDetail[1];
       let taskTime = taskDetail[2];

       let task = {
           taskName,
           taskId,
           userId,
           taskTime
       };
       taskDetails.push(task);
    };

    let userAverages = [];
    let countries = [];
    users.forEach(user => {
        let userTime = [];
        taskDetails.forEach(task => {
            if (Number.parseFloat(user.userId) === Number.parseFloat(task.userId)){
                userTime.push(Number.parseFloat(task.taskTime));
                countries.push({
                    user: user.userId,
                    country: user.userCountry,
                    time: task.taskTime
                })
            };
        });
        let userAverage = (userTime.reduce((a, b) => a+b) / userTime.length).toFixed(2);
        let userId = user.userId;
        return userAverages.push({
        userId,
        userAverage
        });
    });
    const countryAverages = [];
    countries.forEach(country => {
        let countryName = country.country;
            if (!countryAverages.find(({country}) => country === countryName)){
                countryAverages.push({
                    country: country.country,
                    time: [Number.parseFloat(country.time)]
                });
            }
           else {
           countryAverages.forEach(countryAverage => {
            if (countryName === countryAverage.country){
                countryAverage.time.push(Number.parseFloat(country.time))
           };
        });
        };
    });
    const countryArr = [];
    countryAverages.forEach(country => {
        let averageTime = (country.time.reduce((a,b) => a+b) / country.time.length);
        countryArr.push({
            country: country.country,
            averageTime: averageTime.toFixed(2)
        });
    });

    userAverages.sort((a, b) => a.userAverage < b.userAverage);
    countryArr.sort((a, b) => a.averageTime < b.averageTime);

    let userString = [];
    let countryString = [];
    userAverages.forEach(user => {
       userString.push(user.userId + ' ' + user.userAverage)
    });
    countryArr.forEach(country => {
        countryString.push(country.country + ' ' + country.averageTime);
    });
    let finalString = userString.concat(countryString);
    return finalString.join('\n');
};

console.log(analyzeTasks(string))

module.exports = analyzeTasks;