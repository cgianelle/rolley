const EventEmitter = require('events');

class RolleyEmitter extends EventEmitter {}
const rolleyEmitter = new RolleyEmitter();

function checkRandomNumber(action) {
    if (typeof action.start === 'number' && typeof action.range === 'number') {
        if (action.range <= action.start) {
            throw new Error('Error: Random Number Action - Invalid Start/Range Value');
        } else {
            //--Math.floor(Math.random() * range) ==> 0 to range - 1
            return Math.floor(Math.random() * action.range) + action.start;
        }
    } else {
        throw new Error('Error: Random Number Action - Invalid Start/Range Type');
    }
}

function checkAction(action) {
    if (action && action.type) {
        switch (action.type) {
        case 'random_number':
            return checkRandomNumber(action);
        default:
            throw new Error('Action Type, ' + action.type + ', not supported');
        }
    } else {
        throw new Error("Action undefined");
    }
}

function validateScene(name, scenario) {
    if (name && typeof name === 'string') {
        console.log('name: ' + name + ', scenario: ' + JSON.stringify(scenario));
        let scene = scenario[name];
        console.log('scene: ' + JSON.stringify(scene));
        if (scene) {
            rolleyEmitter.emit('scene', name, scene['msg']);

            //--look at actions


            if (scene['next']) {
                let next = scene['next'];
                if (next !== 'quit') {
                    return validateScene(next, scenario);
                } else {
                    return;
                }
            } else {
                throw new Error("Scene, " + name + ", is missing the 'next' field");
            }
        } else {
            throw new Error("Scene is undefined for name, " + name);
        }
    } else {
        throw new Error("Scene name is undefined");
    }
}

function check(scenario) {
    //--before doing anything, make sure there is a start and end element
    if (scenario && scenario['start'] && scenario['end']) {
        validateScene('start', scenario);
    } else {
        throw new Error("Scenario missing Start and/or End element");
    }
}

exports.check = check;
exports.checkAction = checkAction;
exports.rolleyEmitter = rolleyEmitter;
