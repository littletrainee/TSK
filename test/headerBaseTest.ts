import { HeaderBase } from '../source/headerBase.ts'

class Header extends HeaderBase {
    override get waferProbingCoordinateSystemDataReserved(): number {
        return this.tskHeaderByties.subArray(107, 1).toNumber();
    }
    constructor(headerBlock: Uint8Array) {
        // const t1: Uint8Array = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0])
        super(headerBlock);
    }
}
async function headerBaseTest() {
    try {
        const bytes = await Deno.readFile('/Users/luke.lin/Desktop/TSK/sample/60BH82.E-1')
        const header: Header = new Header(bytes);
        const o = header.waferProbingCoordinateSystemDataReserved;
        console.log(header.deviceName);
        header.operatorName = 'Hello';
    } catch (ex) {
        console.log(ex);
    }
}

headerBaseTest();