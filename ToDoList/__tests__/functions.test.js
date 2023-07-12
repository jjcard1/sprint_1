const functions = require('../functions_to_test/functions_to_test')
const data = [
    {
        _id: '123456',
        name: 'task',
        description: 'description',
        manager: 'somebody'
    }
]

test('testing list function', () => {
    expect(functions.list()).toBe('task')
})

test('testing add function', () => {
    expect(functions.add(data)).toBe('task')
})

test('testing del function', () => {
    expect(functions.del(0)).toBe('task')
})

test('testing update function', () => {
    expect(functions.update(0, data)).toBe('task')
})

test('testing find function', () => {
    expect(functions.find('somebody')).toBe('123456')
})