const Fibonacci = require("./fibonacci");
const sinon = require('sinon');
const assert = require('assert');


//spy analisa o comportamento da função
;
(async () => {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    //generators retornam iterators, (.next)
    //exist tree ways to read the dataViewExists
    //using teh functions .next , for await and rest/spread

    for await( const i of fibonacci.execute(3)) {}    //nosso algoritimo ira comçar do zro
    const expectedcallCount = 4    
    assert.deepStrictEqual(spy.callCount,expectedcallCount)
    //we can see the diference of line 15 to the line 22
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        const [...results] = fibonacci.execute(5)

        const {args} = spy.getCall(2)
        const expectedResult = [3,1,2]
        const expectedParams = Object.values({
            input:3, 
            current:1,
            next:2,
        })
        assert.deepStrictEqual(args, expectedParams)
        assert.deepStrictEqual(args, expectedResult)
    }
})();
