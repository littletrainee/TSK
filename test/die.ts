import { DieBase } from '../source/dieBase.ts';

export class Die extends DieBase{
    constructor(currentDieByties : Uint8Array){
        super(currentDieByties);
    }
}