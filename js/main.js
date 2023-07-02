const hienThi = () => {
  const loai = document.getElementById("loaiUser").value;
  console.log(loai);
  if (loai != "none") {
    document.getElementById(loai).style.display = "block";
  }
};

document.getElementById("confirmLoaiUser").addEventListener("click",(event)=>{
    event.preventDefault();
    hienThi();
})