import { IsBoolean, IsNumber } from 'class-validator';

export class CalculationResult {
  // learn about readonly , private and public (may be a good question in interview.)
  @IsBoolean()
  private readonly error: boolean;

  @IsNumber()
  private readonly result: number;

  // you could keep error as second parameter and result as first, so that you can call constructor with only one params
  constructor(result: number, error = false) {
    this.error = error;
    this.result = result;
  }

  //get result
  getResult(): number {
    // also there is a alternative as
    // in javascript you may just access property by calculation.result so this function defination does not makes sense.
    // get result(){
    //    return this.result +200;
    // }
    return this.result;
  }

  getError(): boolean {
    return this.error;
  }
}
