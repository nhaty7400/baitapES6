import { ListPerson } from "../model/ListPerson.js";
import { Validation } from "../model/Validation.js";
import { Student } from "../model/Student.js";
import { Employee } from "../model/Employee.js";
import { Customer } from "../model/Customer.js";

const hienThi = () => {
    const loaiUser = document.getElementById("loaiUser").value;
    const mangLoai = ["student", "employee", "customer"];
    if (loaiUser != "none") {
        mangLoai.map((loai) => {
            if (loaiUser === loai) {
                document.getElementById(loai).style.display = "block";
            } else {
                document.getElementById(loai).style.display = "none";
            }
        })
    } else {
        mangLoai.map((loai) => {
            document.getElementById(loai).style.display = "none";
        })
    }
};

document
    .getElementById("confirmLoaiUser")
    .addEventListener("click", (event) => {
        event.preventDefault();
        hienThi();
    });

const dongTruongThongTin = () => {
    const mangLoai = ["student", "employee", "customer"];
    mangLoai.map((loai) => {
        document.getElementById(loai).style.display = "none";
    })
}

const hienThiTable = (mang) => {
    let content = '';

    mang.map((user) => {
        let trUser = `
            <tr>
                <td>${user.ma}</td>
                <td>${user.ten}</td>
                <td>${user.email}</td>
                <td>${user.loai}</td>
                <td id="thStudent" style="display: none;">${user.diemTB}</td>
                <td id="thEmployee" style="display: none;">${user.totalLuong}</td>
                <td id="thCustomer" style="display: none;">${user.tenCT}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaUser('${user.ma}')">Xóa</button>
                    <button class="btn btn-info" onclick="xemUser('${user.ma}')">Xem</button>
                </td>
            </tr>
            `;
        content += trUser;
    });
    document.getElementById("tbodyUser").innerHTML = content;
}

const dsnd = new ListPerson();
const validation = new Validation();

const setLocalStorage = () => {
    localStorage.setItem("DSND", JSON.stringify(dsnd.mangUser));
};

const getLocalStorage = () => {
    let dataLocal = JSON.parse(localStorage.getItem("DSND"));
    if (dataLocal !== null) {
        hienThiTable(dataLocal);
        dsnd.mangUser = dataLocal;
    }
};

getLocalStorage();

const themUser = () => {
    // lấy data chung
    let ma = document.getElementById("txtMa").value;
    let ten = document.getElementById("txtTen").value;
    let email = document.getElementById("txtEmail").value;
    let diachi = document.getElementById("txtDiaChi").value;
    let loai = document.getElementById("loaiUser").value;

    //validation
    let isValid = true;

    isValid &= validation.checkEmpty(ma, "spanMa", "Mã người dùng không được để trống") && validation.checkIDIsExist(ma, "spanMa", "Mã người dùng đã tồn tại", dsnd.mangUser) && validation.checkID(ma, "spanMa", "Mã người dùng bao gồm 4 tới 10 ký tự chữ và số");
    isValid &= validation.checkEmpty(ten, "spanTen", "Tên người dùng không được để trống") && validation.checkName(ten, "spanTen", "Tên người dùng chỉ chứa kí tự chữ");
    isValid &= validation.checkEmail(email, "spanEmail", "Email không hợp lệ");
    isValid &= validation.checkDiaChi(diachi, "spanDiaChi", "Địa chỉ không hợp lệ");
    isValid &= validation.checkLoai(loai, "spanLoaiUser", "Hãy chọn loại người dùng");

    if (isValid) {
        // check từng loại
        if (loai === "student") {
            let toan = +document.getElementById("txtDiemToan").value;
            let ly = +document.getElementById("txtDiemLy").value;
            let hoa = +document.getElementById("txtDiemHoa").value;
            // validation
            let isValid = true;
            isValid &= validation.checkDiem(toan, "spanToan", "Điểm phải từ 0 tới 10");
            isValid &= validation.checkDiem(ly, "spanLy", "Điểm phải từ 0 tới 10");
            isValid &= validation.checkDiem(hoa, "spanHoa", "Điểm phải từ 0 tới 10");
            if (isValid) {
                let user = new Student(ma, ten, email, diachi, loai, toan, ly, hoa);
                user.tinhDiemTB();
                dsnd.themUser(user);
                alert("Thêm người dùng thành công");
                setLocalStorage();
                hienThiTable(dsnd.mangUser);
                dongTruongThongTin();
                resetForm();
            }
        } else if (loai === "employee") {
            let ngay = +document.getElementById("txtSoNgay").value;
            let luong = +document.getElementById("txtLuongNgay").value;
            // validation
            let isValid = true;
            isValid &= validation.checkNgay(ngay, "spanSoNgay", "Ngày phải từ 1 tới 30 và là số nguyên");
            isValid &= validation.checkLuong(luong, "spanLuongNgay", "Lương phải là số nguyên lớn hơn 0");
            if (isValid) {
                let user = new Employee(ma, ten, email, diachi, loai, ngay, luong);
                user.tinhLuong();
                dsnd.themUser(user);
                alert("Thêm người dùng thành công");
                setLocalStorage();
                hienThiTable(dsnd.mangUser);
                dongTruongThongTin();
                resetForm();
            }
        } else if (loai === "customer") {
            let tenCT = document.getElementById("txtCongTy").value;
            let tghd = document.getElementById("txtTGHD").value;
            let danhGia = document.getElementById("danhGia").value;
            // validation
            let isValid = true;
            isValid &= validation.checkTenCT(tenCT, "spanCongTy", "Tên công ty chứa chỉ kí tự chữ và số");
            if (isValid) {
                let user = new Customer(ma, ten, email, diachi, loai, tenCT, tghd, danhGia);
                dsnd.themUser(user);
                alert("Thêm người dùng thành công");
                setLocalStorage();
                hienThiTable(dsnd.mangUser);
                dongTruongThongTin();
                resetForm();
            }
        }
    }

};

document.getElementById("themUser").addEventListener("click", themUser);

const xoaUser = (ma) => {
    dsnd.xoaUser(ma);
    hienThiTable(dsnd.mangUser);
    setLocalStorage();
}

window.xoaUser = xoaUser;

const hienThiTruongThongTin = (loaiUser) => {
    const mangLoai = ["student", "employee", "customer"];
    mangLoai.map((loai) => {
        if (loaiUser === loai) {
            document.getElementById(loai).style.display = "block";
        } else {
            document.getElementById(loai).style.display = "none";
        }
    });
}

const xemUser = (ma) => {
    var indexFind = dsnd.timIndex(ma);
    if (indexFind > -1) {
        let userFind = dsnd.mangUser[indexFind];
        document.getElementById("txtMa").value = userFind.ma;
        document.getElementById("txtMa").disabled = true;

        document.getElementById("txtTen").value = userFind.ten;
        document.getElementById("txtEmail").value = userFind.email;
        document.getElementById("txtDiaChi").value = userFind.diachi;
        document.getElementById("loaiUser").value = userFind.loai;

        if (userFind.loai === "student") {
            hienThiTruongThongTin(userFind.loai);
            document.getElementById("txtDiemToan").value = userFind.diemToan;
            document.getElementById("txtDiemLy").value = userFind.diemLy;
            document.getElementById("txtDiemHoa").value = userFind.diemHoa;
        } else if (userFind.loai === "employee") {
            hienThiTruongThongTin(userFind.loai);
            document.getElementById("txtSoNgay").value = userFind.soNgay;
            document.getElementById("txtLuongNgay").value = userFind.luong;
        } else if (userFind.loai === "customer") {
            hienThiTruongThongTin(userFind.loai);
            document.getElementById("txtCongTy").value = userFind.tenCT;
            document.getElementById("txtTGHD").value = userFind.tghd;
            document.getElementById("danhGia").value = userFind.danhGia;
        }

    };
};

window.xemUser = xemUser;

const resetForm = () => {
    document.getElementById("formQLND").reset();
}

const capNhatUser = () => {
    // lấy data chung
    let ma = document.getElementById("txtMa").value;
    let ten = document.getElementById("txtTen").value;
    let email = document.getElementById("txtEmail").value;
    let diachi = document.getElementById("txtDiaChi").value;
    let loai = document.getElementById("loaiUser").value;

    //validation
    let isValid = true;

    isValid &= validation.checkEmpty(ten, "spanTen", "Tên người dùng không được để trống") && validation.checkName(ten, "spanTen", "Tên người dùng chỉ chứa kí tự chữ");
    isValid &= validation.checkEmail(email, "spanEmail", "Email không hợp lệ");
    isValid &= validation.checkDiaChi(diachi, "spanDiaChi", "Địa chỉ không hợp lệ");
    isValid &= validation.checkLoai(loai, "spanLoaiUser", "Hãy chọn loại người dùng");

    if (isValid) {
        // check từng loại
        if (loai === "student") {
            let toan = +document.getElementById("txtDiemToan").value;
            let ly = +document.getElementById("txtDiemLy").value;
            let hoa = +document.getElementById("txtDiemHoa").value;
            // validation
            let isValid = true;
            isValid &= validation.checkDiem(toan, "spanToan", "Điểm phải từ 0 tới 10");
            isValid &= validation.checkDiem(ly, "spanLy", "Điểm phải từ 0 tới 10");
            isValid &= validation.checkDiem(hoa, "spanHoa", "Điểm phải từ 0 tới 10");
            if (isValid) {
                let user = new Student(ma, ten, email, diachi, loai, toan, ly, hoa);
                user.tinhDiemTB();
                let result = dsnd.capNhatUser(user);
                if (result) {
                    alert("Cập nhật thành công!");
                    setLocalStorage();
                    hienThiTable(dsnd.mangUser);
                    dongTruongThongTin();
                    resetForm();
                } else {
                    alert("Cập nhật thất bại!")
                }

            }
        } else if (loai === "employee") {
            let ngay = +document.getElementById("txtSoNgay").value;
            let luong = +document.getElementById("txtLuongNgay").value;
            // validation
            let isValid = true;
            isValid &= validation.checkNgay(ngay, "spanSoNgay", "Ngày phải từ 1 tới 30 và là số nguyên");
            isValid &= validation.checkLuong(luong, "spanLuongNgay", "Lương phải là số nguyên lớn hơn 0");
            if (isValid) {
                let user = new Employee(ma, ten, email, diachi, loai, ngay, luong);
                user.tinhLuong();
                let result = dsnd.capNhatUser(user);
                if (result) {
                    alert("Cập nhật thành công!");
                    setLocalStorage();
                    hienThiTable(dsnd.mangUser);
                    dongTruongThongTin();
                    resetForm();
                } else {
                    alert("Cập nhật thất bại!")
                }
            }
        } else if (loai === "customer") {
            let tenCT = document.getElementById("txtCongTy").value;
            let tghd = document.getElementById("txtTGHD").value;
            let danhGia = document.getElementById("danhGia").value;
            // validation
            let isValid = true;
            isValid &= validation.checkTenCT(tenCT, "spanCongTy", "Tên công ty chứa chỉ kí tự chữ và số");
            if (isValid) {
                let user = new Customer(ma, ten, email, diachi, loai, tenCT, tghd, danhGia);
                let result = dsnd.capNhatUser(user);
                if (result) {
                    alert("Cập nhật thành công!");
                    setLocalStorage();
                    hienThiTable(dsnd.mangUser);
                    dongTruongThongTin();
                    resetForm();
                } else {
                    alert("Cập nhật thất bại!")
                }
            }
        }
    }
}

document.getElementById("capNhatUser").addEventListener("click", capNhatUser);

const sapXep = () => {
    const mangSapXep = dsnd.sapXep(dsnd.mangUser);
    hienThiTable(mangSapXep);
}

document.getElementById("sapXep").addEventListener("click", sapXep);


const locUserTheoLoai = () => {
    const loaiUserFilter = document.getElementById("loaiUserFilter").value;
    if (loaiUserFilter === "none") {
        document.getElementById("spanLoaiUserFilter").innerHTML = "Hãy chọn loại người dùng muốn lọc!"
    } else {
        const mangFilter = dsnd.locUser(loaiUserFilter);
        hienThiTable(mangFilter);
    }
}

document.getElementById("btnFilter").addEventListener("click", locUserTheoLoai);

const returnTableGoc = () => {
    hienThiTable(dsnd.mangUser);
}

document.getElementById("DSGoc").addEventListener("click", returnTableGoc);