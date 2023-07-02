export class ListPerson {
    mangUser = [];

    themUser = (user) => {
        this.mangUser.push(user);
    }

    timIndex = (ma) => {
        let indexFind = -1;
        this.mangUser.map((user, index) => {
            if (user.ma === ma) {
                indexFind = index;
            }
        });
        return indexFind;
    }

    xoaUser = (ma) => {
        let index = this.timIndex(ma);
        if (index > -1) {
            this.mangUser.splice(index, 1);
            alert("Xóa thành công")
        }
    }

    capNhatUser = (user) => {
        let indexFind = this.timIndex(user.ma);
        if (indexFind > -1) {
            this.mangUser[indexFind] = user;
            return true;
        }

    };

    sapXep = (mang) => {
        let newMangUser = [];
        newMangUser = [...mang].sort((user2, user1) => {
            return user2.ten
                .toLowerCase()
                .localeCompare(user1.ten.toLowerCase());
        });
        return newMangUser;
    }

    locUser=(loai)=>{
        let mangUserFilter=[];
        this.mangUser.map((user)=>{
            if(loai===user.loai){
                mangUserFilter.push(user);
            }
        });
        return mangUserFilter;
    }
}