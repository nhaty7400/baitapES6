import { Person } from "./Person.js";

export class Student extends Person {
    constructor(ma, ten, email, diachi, loai, toan, ly, hoa) {
      super(ma, ten, email, diachi, loai);
      this.diemToan = toan;
      this.diemLy = ly;
      this.diemHoa = hoa;
    }
    diemTB = 0;
    tinhDiemTB() {
      this.diemTB = (this.diemToan + this.diemLy + this.diemHoa) / 3;
    }
  }

