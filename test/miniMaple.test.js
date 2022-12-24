import {MiniMaple} from "../src/miniMaple";

test('simple term', () => {
    const testMaple = new MiniMaple();

    let testFunc = 'x';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('1');
    testFunc = '2*x';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('2');
    testFunc = 'x^2';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('2*x');
    testFunc = '4*x^2';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('8*x');
    testFunc = '-3*x^3';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('-9*x^2');
    testFunc = 'x^4';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('4*x^3');
});

test('term without variable', () => {
    const testMaple = new MiniMaple();

    let testFunc = '10';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('0');
});

test('other variable', () => {
    const testMaple = new MiniMaple();

    let testFunc = '4*x';
    expect(testMaple.diffFunc(testFunc, 'y')).toBe('0');
    testFunc = '2*x^3';
    expect(testMaple.diffFunc(testFunc, 'y')).toBe('0');
});

test('two terms with one variable', () => {
    const testMaple = new MiniMaple();

    let testFunc = '4*x^2+2*x';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('8*x+2');
    testFunc = '2*x^3-3';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('6*x^2');
    testFunc = '-x^3+10*x^2';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('-3*x^2+20*x');
});

test('two terms with two variable', () => {
    const testMaple = new MiniMaple();

    let testFunc = '20*x^4-3*y^2';
    expect(testMaple.diffFunc(testFunc, 'y')).toBe('-6*y');
});

test('Error', () => {
    const testMaple = new MiniMaple();

    let testFunc = '20/x^3+11';
    expect(testMaple.diffFunc(testFunc, 'x')).toBe('Error');
});

test('matches a regex?', () => {
    const testMaple = new MiniMaple();
    
    let testFunc = '+30*x^3+10';
    expect(testMaple.regexString(testFunc)).toBe(true);
    testFunc = '-5*x';
    expect(testMaple.regexString(testFunc)).toBe(true);
    testFunc = '+12+3*x^3';
    expect(testMaple.regexString(testFunc)).toBe(true);
    testFunc = '+13*x+10*y^3';
    expect(testMaple.regexString(testFunc)).toBe(true);
    testFunc = '+10*x';
    expect(testMaple.regexString(testFunc)).toBe(true);
});