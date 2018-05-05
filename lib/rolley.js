const EventEmitter = require('events');

class RolleyEmitter extends EventEmitter {}
const rolleyEmitter = new RolleyEmitter();

function executeScene(name, scenario) {
    if (name && typeof name === 'string') {
        console.log('name: ' + name + ', scenario: ' + JSON.stringify(scenario));
        let scene = scenario[name];
        console.log('scene: ' + JSON.stringify(scene));
        if (scene) {
            if (scene['msg']) {
                rolleyEmitter.emit(name, scene['msg']);
            }

            //--look at actions

            if (scene['next']) {

                let next = scene['next'];
                if (next !== 'quit') {
                    return executeScene(next, scenario);
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

function run(scenario) {
    //--before doing anything, make sure there is a start and end element
    if (scenario && scenario['start'] && scenario['end']) {
        executeScene('start', scenario);
    } else {
        throw new Error("Scenario missing Start and/or End element");
    }
}

exports.run = run;
exports.rolleyEmitter = rolleyEmitter;
