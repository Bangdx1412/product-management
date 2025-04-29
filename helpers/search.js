module.exports = (query)=>{
    let objectSearch = {
        keyword: ""
    };
        if(query.keyword){
            objectSearch.keyword = query.keyword
            // dung regex trong js de tim kiem
            const regex = new RegExp(objectSearch.keyword,'i')
            objectSearch.regex = regex;
        }
        return objectSearch;
}