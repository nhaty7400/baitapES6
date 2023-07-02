import { Person } from "./Person.js";
export class Customer extends Person{
    constructor(ma, ten, email, diachi, loai,tenCT,tghd,danhGia) {
        super(ma, ten, email, diachi, loai);
        this.tenCT = tenCT;
        this.tghd = tghd;
        this.danhGia=danhGia;
      }
}

