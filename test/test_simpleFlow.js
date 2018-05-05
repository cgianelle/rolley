const expect = require('chai').expect;
var rolley = require('./../lib/rolley');
var rolleyEmitter = require('./../lib/rolley').rolleyEmitter;

// rolleyEmitter.addListener()


var didStart = false;
var didEnd = false;

rolleyEmitter.on('start', (msg) =>{
    console.log(msg);
    didStart = true;
});

rolleyEmitter.on('end', (msg) => {
    console.log(msg);
    didEnd = true;
});

describe('Run a simple scenario with only start and end elements', () => {
    it('Should execute the start element and transition to the end element and run that', () => {
        let simple = {
            "start": {
                "msg": "This is the start node",
                "next": "end"
            },
            "end": {
                "msg": "This is the end node",
                "next": "quit"
            }
        };        
        rolley.run(simple);
        expect(didStart).to.be.true;
        expect(didEnd).to.be.true;
    });

    it('should throw an error when the next scene referenced does not exist', () => {
        let simple = {
            "start": {
                "msg": "This is the start node",
                "next": "alpha"
            },
            "end": {
                "msg": "This is the end node",
                "next": "quit"
            }
        };
        let func = () => {
            rolley.run(simple);
        };
        expect(func).to.throw('Scene is undefined for name');
    });

    it('should throw an error when the next scene referenced is not a string', () => {
        let simple = {
            "start": {
                "msg": "This is the start node",
                "next": []
            },
            "end": {
                "msg": "This is the end node",
                "next": "quit"
            }
        };
        let func = () => {
            rolley.run(simple);
        };
        expect(func).to.throw('Scene name is undefined');
    });

    it("should throw an error when the 'next' field is missing from the start scene", () => {
        let simple = {
            "start": {
                "msg": "This is the start node"
            },
            "end": {
                "msg": "This is the end node",
                "next": "quit"
            }
        };
        let func = () => {
            rolley.run(simple);
        };
        expect(func).to.throw('next');
    });
        
});