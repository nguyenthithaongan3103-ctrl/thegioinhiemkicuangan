const products = [
 {id:1,name:"Áo cardigan Mây Hồng",category:"tops",categoryName:"Áo xinh",price:289000,oldPrice:329000,tag:"BEST SELLER",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80",alt:"Áo cardigan phong cách nhẹ nhàng"},
 {id:2,name:"Váy hoa Nàng Thơ",category:"dresses",categoryName:"Váy liền",price:459000,oldPrice:null,tag:"NEW IN",image:"https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=700&q=80",alt:"Váy nữ phong cách dịu dàng"},
 {id:3,name:"Chân váy Pleats",category:"bottoms",categoryName:"Quần & chân váy",price:319000,oldPrice:null,tag:"LOVED",image:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=700&q=80",alt:"Trang phục chân váy nữ"},
 {id:4,name:"Túi mini Tiểu Thư",category:"accessories",categoryName:"Phụ kiện",price:239000,oldPrice:279000,tag:"-14%",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",alt:"Túi xách nhỏ xinh"},
 {id:5,name:"Áo thun Sunday",category:"tops",categoryName:"Áo xinh",price:189000,oldPrice:null,tag:"EASY WEAR",image:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",alt:"Áo kiểu thời trang thường ngày"},
 {id:6,name:"Đầm kem Dịu Êm",category:"dresses",categoryName:"Váy liền",price:429000,oldPrice:null,tag:"SOFT MOOD",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",alt:"Đầm màu sáng thanh lịch"},
 {id:7,name:"Quần ống rộng Nắng",category:"bottoms",categoryName:"Quần & chân váy",price:349000,oldPrice:null,tag:"COMFY",image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",alt:"Quần dài phong cách casual"},
 {id:8,name:"Kẹp tóc Nơ Xinh",category:"accessories",categoryName:"Phụ kiện",price:79000,oldPrice:null,tag:"LITTLE GIFT",image:"https://images.unsplash.com/photo-1635767798638-3665a0c4b8a5?auto=format&fit=crop&w=700&q=80",alt:"Phụ kiện tóc xinh xắn"}
];
const money = n => new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(n);
let activeCategory="all", searchTerm="", sortMode="featured", cart=JSON.parse(localStorage.getItem("nganCart")||"[]"), wishlist=new Set(JSON.parse(localStorage.getItem("nganWishlist")||"[]"));
const grid=document.getElementById("productGrid"), empty=document.getElementById("emptyState");
function renderProducts(){
 let shown=products.filter(p=>(activeCategory==="all"||p.category===activeCategory)&&(`${p.name} ${p.categoryName}`).toLowerCase().includes(searchTerm.toLowerCase()));
 if(sortMode==="low") shown.sort((a,b)=>a.price-b.price); if(sortMode==="high") shown.sort((a,b)=>b.price-a.price);
 grid.innerHTML=shown.map(p=>`<article class="product-card"><div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.alt}"><span class="product-tag">${p.tag}</span><button class="wishlist ${wishlist.has(p.id)?"active":""}" data-wish="${p.id}" aria-label="${wishlist.has(p.id)?"Bỏ yêu thích":"Thêm yêu thích"} ${p.name}">${wishlist.has(p.id)?"♥":"♡"}</button><button class="quick-add" data-add="${p.id}">Thêm vào giỏ +</button></div><div class="product-info"><span class="product-category">${p.categoryName}</span><h3>${p.name}</h3><div class="price-row"><span class="price">${money(p.price)}</span>${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:""}</div></div></article>`).join("");
 empty.hidden=shown.length>0;
}
function saveCart(){localStorage.setItem("nganCart",JSON.stringify(cart));renderCart();}
function addToCart(id){const line=cart.find(x=>x.id===id);if(line)line.qty++;else cart.push({id,qty:1});saveCart();showToast("Đã thêm món đồ xinh vào giỏ ♡");}
function renderCart(){
 const count=cart.reduce((sum,x)=>sum+x.qty,0);document.getElementById("cartCount").textContent=count;
 const items=document.getElementById("cartItems"), footer=document.getElementById("cartFooter");
 if(!cart.length){items.innerHTML='<div class="cart-empty">Giỏ hàng đang chờ điều dễ thương ♡<br><small style="font:11px DM Sans;margin-top:12px;display:block">Thêm một món bạn thích nhé.</small></div>';footer.hidden=true;return;}
 footer.hidden=false;items.innerHTML=cart.map(line=>{const p=products.find(x=>x.id===line.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.alt}"><div><h3>${p.name}</h3><span class="item-price">${money(p.price)}</span><div class="quantity"><button data-qty="${p.id}" data-change="-1" aria-label="Giảm số lượng">−</button><span>${line.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Tăng số lượng">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Xóa ${p.name}">×</button></div>`}).join("");
 const total=cart.reduce((sum,line)=>sum+products.find(p=>p.id===line.id).price*line.qty,0);document.getElementById("cartTotal").textContent=money(total);document.getElementById("checkoutTotal").textContent=money(total);
}
function showToast(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2500);}
function openCart(){document.getElementById("cartOverlay").hidden=false;document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){document.getElementById("cartOverlay").hidden=true;document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow="";}
grid.addEventListener("click",e=>{const add=e.target.closest("[data-add]"),wish=e.target.closest("[data-wish]");if(add)addToCart(Number(add.dataset.add));if(wish){const id=Number(wish.dataset.wish);wishlist.has(id)?wishlist.delete(id):wishlist.add(id);localStorage.setItem("nganWishlist",JSON.stringify([...wishlist]));renderProducts();showToast(wishlist.has(id)?"Đã lưu vào mục yêu thích ♡":"Đã bỏ khỏi mục yêu thích");}});
document.getElementById("filters").addEventListener("click",e=>{const btn=e.target.closest("[data-category]");if(!btn)return;activeCategory=btn.dataset.category;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));renderProducts();});
document.getElementById("searchInput").addEventListener("input",e=>{searchTerm=e.target.value.trim();renderProducts();});
document.getElementById("sortSelect").addEventListener("change",e=>{sortMode=e.target.value;renderProducts();});
document.getElementById("searchFocus").addEventListener("click",()=>{document.getElementById("shop").scrollIntoView({behavior:"smooth"});setTimeout(()=>document.getElementById("searchInput").focus(),350);});
document.getElementById("openCart").addEventListener("click",openCart);document.getElementById("closeCart").addEventListener("click",closeCart);document.getElementById("cartOverlay").addEventListener("click",closeCart);
document.getElementById("cartItems").addEventListener("click",e=>{const qty=e.target.closest("[data-qty]"),remove=e.target.closest("[data-remove]");if(qty){const id=Number(qty.dataset.qty),line=cart.find(x=>x.id===id);line.qty+=Number(qty.dataset.change);if(line.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));saveCart();}});
const dialog=document.getElementById("checkoutDialog");
document.getElementById("checkoutButton").addEventListener("click",()=>{if(!cart.length)return;closeCart();dialog.showModal();});
document.getElementById("closeCheckout").addEventListener("click",()=>dialog.close());
document.getElementById("checkoutForm").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.currentTarget);const order={name:data.get("name"),phone:data.get("phone"),address:data.get("address"),note:data.get("note"),items:cart.map(line=>({name:products.find(p=>p.id===line.id).name,quantity:line.qty})),total:cart.reduce((sum,line)=>sum+products.find(p=>p.id===line.id).price*line.qty,0)};console.log("Demo order (not transmitted):",order);cart=[];saveCart();dialog.close();e.currentTarget.reset();showToast("Đặt hàng demo thành công! Chưa có đơn thật được gửi.");});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();const email=document.getElementById("emailInput").value.trim();document.getElementById("newsletterMessage").textContent=`Cảm ơn bạn nha ♡ (${email}) — bản demo chưa lưu email vào hệ thống.`;e.currentTarget.reset();});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("show"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("show")));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
renderProducts();renderCart();
