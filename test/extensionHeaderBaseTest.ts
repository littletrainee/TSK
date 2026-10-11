import { ExtendedHeaderBase } from '../source/extensionHeaderBase.ts';
import { HeaderBase } from '../source/headerBase.ts';

class Header extends HeaderBase {
    constructor(headerBlock: Uint8Array) {
        // const t1: Uint8Array = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0])
        super(headerBlock);
    }
}

class ExtendedHeader extends ExtendedHeaderBase{
    constructor(extendedHeaderBlock: Uint8Array) {
        super(extendedHeaderBlock);
    }
}

async function extendedHeaderTest(){
    try {
        const bytes : Uint8Array = await Deno.readFile('/Users/luke.lin/Desktop/TSK/sample/60BH82.E-1')
        // const bytes = await Deno.readFile('D:\\Document\\TSK\\sample\\60BH82.E-1');
        let currentIndex : number = 0;
        const header: Header = new Header(bytes.subarray(0, 236));
        currentIndex += header.headerByties.length;

        currentIndex += header.mapDataAreaLineSize * header.MapDataAreaRowSize * 6;

        const fileStructure = header.fileStructure;
        if (fileStructure[2] === '1') {
            console.log('has line category information')
        }

        let extendedHeader : ExtendedHeader ;

        if (fileStructure[3] === '1'){
            extendedHeader = new ExtendedHeader(bytes.subarray(currentIndex, currentIndex + 172));
            console.log(extendedHeader);
        }




        header.operatorName = 'Hello';
    } catch (ex) {
        console.log(ex);
    }

}

extendedHeaderTest();