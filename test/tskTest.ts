import { TSK } from './tsk.ts';

async function tskTest(){
    try {
        const bytes = await Deno.readFile('/Users/luke.lin/Desktop/TSK/sample/60BH82.E-1')
        const tsk : TSK = new TSK(bytes);

        console.log(tsk);
    } catch (ex) {
        console.log(ex);
    }
}

tskTest();