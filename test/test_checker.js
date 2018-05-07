const expect = require('chai').expect;
var checker = require('./../lib/checker');
var rolleyEmitter = require('./../lib/checker').rolleyEmitter;

var scenes = [];

rolleyEmitter.on('scene', (name, msg) =>{
    console.log('Scene Name: ' + name + ', Message: ' + msg);
    scenes.push(name);
});

describe('Run a simple scenario with only start and end elements', () => {
    beforeEach(() => {
        scenes = [];
    });

    it('Should check the start element and transition to the end element and validate that', () => {
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
        checker.check(simple);
        expect(scenes).to.have.ordered.members(['start', 'end'])
    });

    it('Should check the flow between the three scenes', () => {
        let simple = {
            "start": {
                "msg": "This is the start node",
                "next": "alpha"
            },
            "alpha": {
                "msg": "This is the alpha node",
                "next": "end"
            },
            "end": {
                "msg": "This is the end node",
                "next": "quit"
            }
        };
        checker.check(simple);
        expect(scenes).to.have.ordered.members(['start', 'alpha', 'end'])        
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
            checker.check(simple);
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
            checker.check(simple);
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
            checker.check(simple);
        };
        expect(func).to.throw('next');
    });
        
    it("should validate an action type of random_number with a range from 0 to 4", () => {
        let action = {
            "type": "random_number",
            "description": "Pick a random number between start and start + range - 1",
            "start": 0,
            "range": 5
        };
        let rn = checker.checkAction(action);
        expect(rn).to.be.within(action.start, (action.start + action.range - 1));
    });

    it("should validate an action type of random_number with a range from 5 to 14", () => {
        let action = {
            "type": "random_number",
            "description": "Pick a random number between start and start + range - 1",
            "start": 5,
            "range": 10
        };
        let rn = checker.checkAction(action);
        expect(rn).to.be.within(action.start, (action.start + action.range - 1));
    });

    it("should throw an error on an invalid range, start: 0, range: 0", () => {
        let action = {
            "type": "random_number",
            "description": "Pick a random number between start and start + range - 1",
            "start": 0,
            "range": 0
        };
        let func = () => {
            checker.checkAction(action);
        };
        expect(func).to.throw('Value');
    });
    
    it("should throw an error on an invalid range, start: 1, range: 0", () => {
        let action = {
            "type": "random_number",
            "description": "Pick a random number between start and start + range - 1",
            "start": 1,
            "range": 0
        };
        let func = () => {
            checker.checkAction(action);
        };
        expect(func).to.throw('Value');
    });
    
    it("should throw an error on an invalid type, start: 1, range: end", () => {
        let action = {
            "type": "random_number",
            "description": "Pick a random number between start and start + range - 1",
            "start": 1,
            "range": 'end'
        };
        let func = () => {
            checker.checkAction(action);
        };
        expect(func).to.throw('Type');
    });
    
    it("should throw an error on an invalid type, start: end, range: 5", () => {
        let action = {
            "type": "random_number",
            "description": "Pick a random number between start and start + range - 1",
            "start": 'end',
            "range": 5
        };
        let func = () => {
            checker.checkAction(action);
        };
        expect(func).to.throw('Type');
    });

    it("should throw an error on an invalid type, start missing, range: 5", () => {
        let action = {
            "type": "random_number",
            "description": "Pick a random number between start and start + range - 1",
            "range": 5
        };
        let func = () => {
            checker.checkAction(action);
        };
        expect(func).to.throw('Type');
    });
    
    it("should throw an error on an invalid type, start: 0, range missing", () => {
        let action = {
            "type": "random_number",
            "description": "Pick a random number between start and start + range - 1",
            "start": 'end'
        };
        let func = () => {
            checker.checkAction(action);
        };
        expect(func).to.throw('Type');
    });

    it("should throw an error on an undefined action", () => {
        let func = () => {
            checker.checkAction();
        };
        expect(func).to.throw('undefined');
    });
    
    it("should throw an error on an invalid action type, some_new_action", () => {
        let action = {
            "type": "some_new_action"
        };
        let func = () => {
            checker.checkAction(action);
        };
        expect(func).to.throw('not supported');
    });
    
});