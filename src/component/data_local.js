export const setLocal = (data) => {
    Object.keys(data).forEach(key => {
        if (data[key] == null){
           localStorage.setItem(key, "");
        }
        else{
           localStorage.setItem(key, data[key]);
        }
    })
}

export const removeLocal = () => {
   localStorage.clear();
}