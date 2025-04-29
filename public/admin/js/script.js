// Button status
const buttonsStatus = document.querySelectorAll("[button-status]");
if(buttonsStatus.length>0){
    
    let url = new URL(window.location.href)
    console.log(url);
    
    
    
    buttonsStatus.forEach(button=>{
        // console.log(button);
        button.addEventListener("click",()=>{
            const status = button.getAttribute('button-status');
            // console.log(status);
            if(status){
                url.searchParams.set('status',status);
            }else{
                url.searchParams.delete('status')
            }
            console.log(url.href);
            window.location.href = url.href;
            
        })
        
    })
}
// End button status

// Search input
    const formSeach = document.querySelector('#form-search')
    let url = new URL(window.location.href)
    if(formSeach){
        formSeach.addEventListener("submit",(e)=>{
            
            e.preventDefault();
            const keyword = e.target.elements.keyword.value;
            if(keyword){
                url.searchParams.set('keyword',keyword)
            }else{
                url.searchParams.delete('keyword')
            }
            // Chuyển hướng sang trang tìm kiếm 
            window.location.href = url.href;
        })
    }
// End search input
