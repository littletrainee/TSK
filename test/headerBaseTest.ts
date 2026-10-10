import { HeaderBase } from '../source/headerBase.ts';

class Header extends HeaderBase {
    constructor(headerBlock: Uint8Array) {
        // const t1: Uint8Array = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0])
        super(headerBlock);
    }
}
async function headerBaseTest() {
    try {
        // const bytes = await Deno.readFile('/Users/luke.lin/Desktop/TSK/sample/60BH82.E-1')
        const bytes = await Deno.readFile('D:\\Document\\TSK\\sample\\60BH82.E-1');
        const header: Header = new Header(bytes);
        const a = header.fileStructure; 

        header.operatorName = 'Hello';
    } catch (ex) {
        console.log(ex);
    }
}

headerBaseTest();
