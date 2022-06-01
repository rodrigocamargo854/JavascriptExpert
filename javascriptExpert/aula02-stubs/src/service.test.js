const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
//urls reais para de acesso ao back
const BASE_URL_1 = "https://swapi.dev/api/planets/1/"
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"
//retornos mocados
const mocks = {
    tatooine: require('./mocks/tatooine.json'),
    alderaan: require('./mocks/alderaan.json'),
}
;
(async () => {
    // {
    //     // vai para a internet!!
    //     const service = new Service()
    //     const withoutStub = await service.makeRequest(BASE_URL_2)
    //     console.log(JSON.stringify(withoutStub))
    // }
    //cria o service para acesso ao stub
    const service = new Service()
    const stub = sinon.stub(service, service.makeRequest.name)

    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)
    stub
        .withArgs(BASE_URL_2)
        .resolves(mocks.alderaan)

    {
        const expected = {
            "name": "Tatooine",
            "surfaceWater": "1",
            appearedIn: 5, 
            "gravity": "1 standard",
        }
        const results = await service.getPlanets(BASE_URL_1)
        deepStrictEqual(results, expected)

    }
    {
        const expected = {
            "name": "Alderaan",
            "surfaceWater": "40",
            appearedIn: 2,
            "gravity": "1 standard",
        }
        const results = await service.getPlanets(BASE_URL_2)
        deepStrictEqual(results, expected)
        console.log('result',results)
    }
})()