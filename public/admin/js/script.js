// Button status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);
  // console.log(url);

  buttonsStatus.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      // console.log(status);
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      // console.log(url.href);
      window.location.href = url.href;
    });
  });
}
// End button status

// Search input
const formSeach = document.querySelector("#form-search");
let url = new URL(window.location.href);
if (formSeach) {
  formSeach.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    // Chuyển hướng sang trang tìm kiếm
    window.location.href = url.href;
  });
}
// End search input
// Pagination
// Muốn lấy thuộc tính tự định nghĩa dùng dấu ngoặc vuông
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End pagination

// Logic checkbox all
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  // Lay ra o checkall
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  // Lay ra cac o input
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
  // Khi tick vao inputCheckAll thi tat ca cac o input deu phai duoc tik
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });
  // Khi tick tat ca cac o thi o checkAll cx phai duoc tick
  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      // dem so luong o input da duoc checked
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      // Dem Tong so luong o input
      // console.log(inputsId.length);
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox
// Submit form checkbox
// Lấy ra form để update status
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    // Ngăn không cho chuyển trang
    e.preventDefault();
    // console.log(e);

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm(
        "Bạn có chắc muốn xóa tất cả các sản phẩm trên?"
      );
      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      // mảng chứa các id
      let ids = [];
      // Gọi ra cái input:text chứa các value ids để submit
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      // Lọc qua từng phần tử được checkbox để lấy ra id
      inputsChecked.forEach((input) => {
        // Lấy ra id
        const id = input.value;
        if (typeChange == "position") {
          // closest là hàm dùng để lấy phần tử Cha
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;

            ids.push(`${id}-${position}`);
        
        } else {
          // Gán id vào mảng id
          ids.push(id);
        }
      });
      // truyền dữ liệu dạng string của id cho ô input:text.ids
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi");
    }
  });
}
