// console.log("oke 1");
// Change status 
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonsChangeStatus.length>0){
    const formChangeStatus = document.querySelector("#form-change-status");
    // console.log(formChangeStatus);   
    const path = formChangeStatus.getAttribute('data-path')
    // console.log(path);
    buttonsChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusCurrent = button.getAttribute('data-status');
            const id = button.getAttribute('data-id')
            // cập nhật lại giá trị status
            const changeStatus = (statusCurrent === 'active') ? 'inctive' : 'active';
            // Tạo action mới
            const action = path + `/${changeStatus}/${id}?_method=PATCH`;
            // console.log(action);
            // Gán lại giá trị cho action bên form
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })   
}


// Delete Product
const buttonDeletes = document.querySelectorAll("[button-delete]");
if(buttonDeletes.length>0){
    // Lay ra form delete
    const formDeleteItem = document.querySelector('#form-delete-item')
    // Lay ra duong dan cua no
    const path = formDeleteItem.getAttribute("data-path")
    buttonDeletes.forEach(button =>{
       button.addEventListener("click",()=>{
        const isConfirm = confirm('You sure want to it??')
        if(isConfirm){
            const id = button.getAttribute("data-id")
            // console.log(id);
            // Gan action sua lai ca method
            const action = `${path}/${id}?_method=DELETE`;
            // console.log(action);
            // Truyen action vao form
            formDeleteItem.action = action;
            formDeleteItem.submit();
        }
       })
        
    })
}


// End delete Product
