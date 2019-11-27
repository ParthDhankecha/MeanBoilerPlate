import { Injectable } from '@nestjs/common';

@Injectable()
export class Config {
  public fs = require('fs');
  public secret = this.fs.readFileSync(__dirname + '/data.txt', 'utf-8');
}
