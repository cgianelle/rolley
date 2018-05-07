const expect = require('chai').expect;
var checker = require('./../lib/checker');

describe('Basic Flow Test From Start Node to End Node', () => {
    it('should throw an error when it encounters a scenario that does not have a start element', () => {
        let simple = {
            "end": {
                "test": "This is the end node",
                "next": ""
            }
        };
        let func = () => {
            checker.check(simple);
        };
        expect(func).to.throw();
    });  
    
    it('should throw an error when it encounters a scenario that does not have an end element', () => {
        let simple = {
            "start": {
                "test": "This is the start node",
                "next": "end"
            }
        };
        let func = () => {
            checker.check(simple);
        };
        expect(func).to.throw();
    });    
    
});