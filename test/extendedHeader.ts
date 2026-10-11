import { ExtendedHeaderBase } from '../source/extensionHeaderBase.ts';

export class ExtendedHeader extends ExtendedHeaderBase {
    constructor(extendedHeaderBlock: Uint8Array) {
        super(extendedHeaderBlock);
    }
}
