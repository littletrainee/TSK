import { TSKBase } from '../source/tskBase.ts';
import { Die } from './die.ts';
import { ExtendedDie } from './extendedDie.ts';
import { ExtendedHeader } from './extendedHeader.ts';
import { Header } from './header.ts';

export class TSK extends TSKBase {
    constructor(byties: Uint8Array) {
        super(byties);
        this.header = new Header(this.tskByties.subarray(0, 236));
        this.currentIndex += this.header.headerByties.length;

        this.readTSKDie();

        const fileStruct = this.header.fileStructure;

        //#region Line Category Information
        if (fileStruct[2] === '1') {
            this.lineCategory = this.tskByties.subarray(this.currentIndex, this.currentIndex + 2 * this.dies.length);
            this.currentIndex += this.lineCategory.length;
        }
        //#endregion

        //#region Extended Header Information
        if (fileStruct[3] === '1') {
            this.extendedHeader = new ExtendedHeader(this.tskByties.subarray(this.currentIndex, this.currentIndex + 172));
            this.currentIndex += this.extendedHeader.currentByties.length;
        }
        //#endregion

        //#region Test Result Information Per Extended Die
        if (fileStruct[4] === '1') {
            this.readExtendedDie();
        }
        //#endregion

        //#region Extended Line Category Information
        if (fileStruct[5] === '1') {
            this.extendedLineCategory = this.tskByties.subarray(this.currentIndex, this.currentIndex + 2 * this.dies.length);
            this.currentIndex += this.extendedLineCategory.length;
        }
        //#endregion

        //#region Other Data
        if (this.currentIndex != this.tskByties.length) {
            const length: number = this.tskByties.length - this.currentIndex;
            this.otherData = this.tskByties.subarray(this.currentIndex, this.currentIndex + length);
        }
        //#endregion
    }

    protected override readTSKDie(): void {
        this.dies = [];
        const dieCount = this.header.mapDataAreaLineSize * this.header.MapDataAreaRowSize;
        for (let i = 0; i < dieCount; i++) {
            const die: Die = new Die(this.tskByties.subarray(this.currentIndex, this.currentIndex + 6));
            if (die.isPassDie && !this.passBins.includes(die.dieCharacter)) {
                this.passBins.push(die.dieCharacter);
            }
            this.dies.push(die);
            this.currentIndex += 6;
        }
    }

    protected override readExtendedDie(): void {
        for (const die of this.dies) {
            die.extendedDieData = new ExtendedDie(this.tskByties.subarray(this.currentIndex, this.currentIndex + 4));
            this.currentIndex += 4;
        }
    }
}
