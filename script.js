class ListProducts{
    constructor(img, name, desc, price) {
        this.img = img;
        this.name = name;
        this.desc = desc;
        this.price = price;
    }
    getImg(){
        return this.img
    }
    getName() {
        return this.name
    }
    getDesc(){
        return this.desc
    }
    getPrice(){
        return this.price
    }
}
let products = [
    new ListProducts("image/aovest.png", "ÁO VEST Kingsman Đen KHUY HỌA TIẾT HERRINGBONE - AV330CQ", "Sử dụng những chất liệu vải cao cấp đến từ Korea", "3.969.996"),
    new ListProducts("image/aovest3.jpg", "ÁO VEST BEIGE HỌA TIẾT HERRINGBONE - AV326", "Sử dụng những chất liệu vải cao cấp đến từ USA", "2.899.999"),
    new ListProducts("image/maulam.webp", "ÁO VEST Kingsman HỌA TIẾT STRIPE - AV334", "Sử dụng những chất liệu vải cao cấp đến từ Germany", "3.799.999"),
    new ListProducts("image/bovest.webp", "ÁO VEST Kingsman KEM HỌA TIẾT KẺ SỌC - AV266", "Sử dụng những chất liệu vải cao cấp đến từ France", "4.686.686"),
    new ListProducts("image/aovest4.webp", "ÁO VEST Kingsman XANH GHI KẺ - AV303", "Sử dụng những chất liệu vải cao cấp đến từ France", "4.999.966"),
    new ListProducts("image/vestdep1..webp", "ÁO VEST Kingsman TÚI KIỂU NHỎ  - AV260", "Táo bạo, mạnh mẽ, độc đáo và kỹ thuật, chất liệu vải cao cấp", "5.899.999"),
    new ListProducts("image/aovestda.jpg", "ÁO VEST Kingsman Nâu Sáng DARK BROWN - AV243", "Sử dụng những chất liệu vải cao cấp đến từ England", "3.769.796"),
    new ListProducts("image/aovest5.webp", "ÁO VEST TUXEDO LUXURY ĐEN VÂN CỔ NHỌN BÓNG - TXV209CNB", "Sử dụng những chất liệu vải cao cấp đến từ Switzerland", "4.969.696")
]
function displayProducts() {
    let content = ``;
    for (let i = 0; i < products.length; i++) {
        content += `<div class="item">
        <img src=${products[i].getImg()} alt="">
        <div class="name">${products[i].getName()}</div>
        <div class="desc">${products[i].getDesc()}</div>
        <div class="price"><span>${products[i].getPrice()}</span> vnđ</div>
        <button>Thêm vào giỏ hàng</button>
        </div>`
    }
    document.getElementById("list-products").innerHTML = content;
}
displayProducts();
const btn = document.querySelectorAll(".item button")
btn.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
        let btnItem = event.target;
        let product = btnItem.parentElement;
        let productImg = product.querySelector("img").src;
        let productName = product.querySelector(".name").innerText;
        let productPrice = product.querySelector(".price span").innerText;
        addcart(productImg, productName, productPrice);
    })
})
function addcart(productImg, productName, productPrice) {
    let addtr = document.createElement("tr");
    let cartItem = document.querySelectorAll("tbody tr");
    for (let i = 0; i < cartItem.length; i++) {
        let productN = document.querySelectorAll("td .name");
        if (productN[i].innerHTML == productName) {
            alert("Sản phẩm bạn chọn đã có trong giỏ hàng");
            return;
        }
    }
    let content = '<tr><td><img src=' + productImg + '><p class="name">' + productName + '</p></td><td class="price"><span>' + productPrice + '</span> vnđ</td><td><input type="number" value="1" min="1"></td><td class="delete">Xóa</td></tr>'
    addtr.innerHTML = content;
    let cartTable = document.querySelector("tbody");
    cartTable.append(addtr);
    cartTotal();
    deleteCart();
}
function cartTotal() {
    let cartItem = document.querySelectorAll("tbody tr");
    let total = 0;
    let inputvalue = 0;
    for (let i = 0; i < cartItem.length; i++) {
        let inputvalueA = cartItem[i].querySelector("input").value;
        let productPrice = cartItem[i].querySelector(".price span").innerHTML;
        productPrice = parseFloat(productPrice.replace(/\./g, ""));
        let totalA = inputvalueA * productPrice;
        total = total + totalA;
        inputvalue = Number(inputvalue) + Number(inputvalueA);
    }
    let cartTotalResult = document.querySelector(".priceTotal span");
    let cartPrice = document.querySelector("#actions span");
    cartTotalResult.innerHTML = total.toLocaleString('de-DE');
    cartPrice.innerHTML = inputvalue;
    inputChange()
}
function deleteCart() {
    let cartItem = document.querySelectorAll("tbody tr");
    for (let i = 0; i < cartItem.length; i++) {
        let productD = document.querySelectorAll(".delete");
        productD[i].addEventListener("click", function (event) {
            let cartDelete = event.target;
            let cartTr = cartDelete.parentElement;
            cartTr.remove();
            cartTotal()
        })
    }
}
function inputChange() {
    let cartItem = document.querySelectorAll("tbody tr");
    for (let i = 0; i < cartItem.length; i++) {
        let inputValue = cartItem[i].querySelector("input");
        inputValue.addEventListener("change", function () {
            cartTotal()
        })
    }
}
let showCart = document.querySelector("#actions .cartItem img");
showCart.addEventListener("click", function () {
    document.querySelector("#cart").style.right = "0";
})
let offCart = document.querySelector("#cart img");
offCart.addEventListener("click", function () {
    document.querySelector("#cart").style.right = "-100%"
})
let showLogIn = document.querySelector("#actions .user img");
showLogIn.addEventListener("click", function(){
    document.querySelector("#logIn").style.right = "300px"
})
