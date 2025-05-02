module.exports = (objectPagination,query,countProducts)=>{
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
   
    // Tính ra số trang 
    const totalPage = Math.ceil(countProducts/objectPagination.limitItiem)
    // Thêm vào objectPagination một biến tên là totalPage
    objectPagination.totalPage = totalPage
    // console.log(totalPage);
    
    // console.log(objectPagination.currentPage);
    // Thêm skip
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItiem
    return objectPagination;
}