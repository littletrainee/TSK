import { DieBase } from '../source/dieBase.ts';
import * as e from '../source/enum.ts';

class Die extends DieBase{
    constructor(currentDieBytes : Uint8Array){
        super(currentDieBytes);
    }
}

async function dieBaseTest(){
    const bytes = await Deno.readFile('/Users/luke.lin/Desktop/TSK/sample/60BH82.E-1')
    // const bytes = new Uint8Array([0,0,10, 2, 10, 0, 0, 0, 1]);

    const die : Die = new Die(bytes.subarray(236, 236 + 6));
    // const die : Die = new Die(bytes.subarray(1, 7));
    die.dieTestResult = e.DieTestResult.PassDie;
    console.log(die.firstWord);
}

dieBaseTest();