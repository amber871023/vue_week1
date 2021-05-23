//初始化資料
const productTitle = document.querySelector("#title");
const productOriginPrice = document.querySelector("#origin_price");
const productPrice = document.querySelector("#price");
const isEnabled = document.querySelector("#isEnabled");
const addProductForm = document.querySelector("#addProductForm");
//
const addBtn = document.querySelector("#addProduct");
const clearAllBtn = document.querySelector("#clearAll");
const productList = document.querySelector("#productList");
const productCount = document.querySelector("#productCount");
let data = [
  {
    id: 1620358258785,
    title: "口罩",
    origin_price: 300,
    price: 250,
    isEnabled: false
  }
];

//渲染產品列表
function render(){
  let str = '';
  data.forEach((item) => {
    str += `
    <tr>
      <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${item.id}" ${item.isEnabled? 'checked': ''} data-action="status" data-id="${item.id}" data-method="changeStatus">
        <label class="form-check-label" for="${item.id}">${item.isEnabled? '啟用' : '未啟用'}</label>
        </div>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-outline-danger move" data-action="remove" data-id="${item.id}" data-method="deleteProduct"> 刪除 </button>
      </td>
    </tr>`;
  });
  productList.innerHTML = str;
  productCount.textContent = data.length;
}
render();

//新增產品 + 防呆
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if(productTitle.value == "" || productOriginPrice.value == "" || productPrice.value == "" ){
    alert("請填寫完整資料");
  }else if(productOriginPrice.value < 1 ){
    alert("原價金額不能為0");
  }else if(productPrice.value < 1 ){
  alert("售價金額不能為0");
  }else{
  data.push({
    id: Date.now(),
    title: productTitle.value.trim(),//使用trim去除開頭結尾空白字元
    origin_price: parseInt(productOriginPrice.value) || 0,
    price: parseInt(productPrice.value) || 0,
    isEnabled: isEnabled.checked,
  });
 alert("新增成功");
  }
  addProductForm.reset();
  render();
})

// 刪除所有產品
clearAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  data = [];
  render();
});

//切換產品啟用狀態
productList.addEventListener("click", (e) => {
  e.preventDefault();
  const method = e.target.dataset.method;
  let id = e.target.dataset.id;
  if (method == "deleteProduct") {
    data = deleteProduct(id);
  }else if (method == "changeStatus") {
    data = changeStatus(id);
  }
  render();
});

//刪除一筆產品
function deleteProduct(id) {
  return data.filter((item) => item.id != id);
}

//更改產品狀態
function changeStatus(id){
  return data.map((item) => {
    if (item.id == id) {
      item.isEnabled = !item.isEnabled;
    }
    return item;
  });
  render();
}
