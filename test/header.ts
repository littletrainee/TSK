import { HeaderBase } from '../source/headerBase.ts';

export class Header extends HeaderBase{
    constructor(headerBlock : Uint8Array){
        super(headerBlock);
    }
}