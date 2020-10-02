const analyzeTasks = require('./analyzeTasks');

const inputString = `2
1 PT
2 US
3
1 1 10
2 1 5
3 2 10
`;
const outputString = `1 7.50
2 10.00
PT 7.50
US 10.00`

it('analyze task function works', () => {
    expect(analyzeTasks(inputString)).toEqual(outputString);
});