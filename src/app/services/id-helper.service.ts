import {Injectable} from '@angular/core';

@Injectable()
export class IdHelperService {

  constructor() {}

  compare(a: string, b: string, isNumeric: boolean): number {
    if (a === b) {
      return 0;
    }
    if (isNumeric) {
      const na = Number.parseInt(a);
      const nb = Number.parseInt(b);
      if (na < nb) {
        return -1;
      } else if (na > nb) {
        return 1;
      } else {
        return 0;
      }
    }

    if (a.length < b.length) {
      return -1;
    }
    if (a.length > b.length) {
      return 1;
    }

    for (let pos = 0; pos < a.length; pos++) {
      if (a[pos] < b[pos]) {
        return -1;
      }
      if (a[pos] > b[pos]) {
        return 1;
      }
    }
    return 0;
  }

  public lastId(ids: IterableIterator<string>, isNumeric: boolean): string {
    let max: string;
    for (const cur of ids) {
      if (max === undefined) {
        max = cur;
      } else if (cur !== undefined && this.compare(max.trim(), cur.trim(), isNumeric) < 0) {
        max = cur;
      }
    }
    return max;
  }

  private nextIdAlpha(ids: IterableIterator<string>): string {
    const low = 'a'.charCodeAt(0);
    const high = 'z'.charCodeAt(0);
    const last: string = this.lastId(ids, false);
    if (last === undefined) {
      return String.fromCharCode(low);
    }
    let result = '';
    let carry = true;
    let pos = last.length;
    while (pos--) {
      let c: number = last.charCodeAt(pos);
      if (carry) {
        c++;
        if (c > high) {
          c = low;
          carry = true;
        } else {
          carry = false;
        }
      }
      result = String.fromCharCode(c) + result;
    }
    return result;
  }

  public nextId(ids: IterableIterator<string>, isNumeric: boolean): string {
    if (!isNumeric) {
      return this.nextIdAlpha(ids);
    }
    const last: string = this.lastId(ids, true);
    if (last === undefined) {
      return '1';
    }
    const next = Number.parseInt(last) + 1;
    return next.toString();
  }
}
