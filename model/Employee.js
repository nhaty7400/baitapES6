import { Person } from "./Person.js";
export class Employee extends Person {
    constructor(ma, ten, email, diachi, loai, ngay, luong) {
      super(ma, ten, email, diachi, loai);
      this.soNgay = ngay;
      this.luong = luong;
    }
    totalLuong = 0;
    tinhLuong() {
      this.totalLuong = this.soNgay * this.luong;
    }
  }

