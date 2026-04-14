console.log('hide oos loaded');
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if(getParameterByName('filter.v.option.size')) {
    setTimeout(ShowHideSizes, 50);
    
}

window.navigation.addEventListener("navigate", (event) => {
    setTimeout(ShowHideSizes, 50);
});

function ShowHideSizes(){
    if(getParameterByName('filter.v.option.size')) {
        var mysize = getParameterByName('filter.v.option.size').toLowerCase();
        const productsList = document.querySelectorAll(`ul#product-grid li`);
        productsList.forEach((product)=>{
            if(product.getAttribute(`data-size-${mysize}`)=="true") {
                product.style.display = 'list-item';
            } else {
                product.style.display = 'none';
            }
        })
    }
}