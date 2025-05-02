// console.log("oke 1");
// Change status 
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonsChangeStatus.length>0){
    const formChangeStatus = document.querySelector("#form-change-status");
    console.log(formChangeStatus);
    
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
