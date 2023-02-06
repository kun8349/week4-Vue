const {createApp} = Vue;
import pagination from "../components/pagination.js";
import modalProduct from "../components/modal-product.js";
import delModal from "../components/del-modal.js";

let productModal = null;
let delProductModal = null;

const app = createApp({
    data() {
        return {
            isNew:true,
            productList:[],
            tempProduct:{
                imagesUrl:[],
            },
            pages:{},

        }
    },
    components:{
        pagination,
        modalProduct,
        delModal,
    },
    methods: {
        checkLogin(){
            axios.post(`${url}api/user/check`)
                .then(res=>{
                    this.getProducts();
                })
                .catch(err=>{
                    alert(err.response.data.message);
                    window.location='login.js';
                })
        },
        
        getProducts(page){
            axios.get(`${url}api/${path}/admin/products/?page=${page}`)
                .then(res=>{
                    this.productList = res.data.products;
                    this.pages= res.data.pagination;
                })
                .catch(err=>{
                    alert(err.response.data.message);
                });
        },
        openModal(type,item){
            if(type === 'new'){
                this.isNew = true;
                this.tempProduct = {
                    imagesUrl:[],
                };
                productModal.show();
            }else if(type === 'edit'){
                this.tempProduct = {...item};
                this.isNew = false;
                productModal.show();
            }else if(type === 'del'){
                this.tempProduct = {...item};
                this.isNew = false;
                delProductModal.show();
            }
        },
        delProduct(){
            axios.delete(`${url}api/${path}/admin/product/${this.tempProduct.id}`)
                .then(res=>{
                    alert(res.data.message);
                    delProductModal.hide();
                    this.getProducts();
                })
                .catch(err=>{
                    alert(err.response.data.message);
                })
        },
        updateProduct(){
            if(this.isNew===true){
                axios.post(`${url}api/${path}/admin/product`,{data:this.tempProduct})
                    .then(res=>{
                        alert(res.data.message);
                        this.getProducts();
                        productModal.hide();
                    })
                    .catch(err=>{
                        alert(err.response.data.message);
                    })
            }else if(this.isNew===false){
                axios.put(`${url}api/${path}/admin/product/${this.tempProduct.id}`,{data:this.tempProduct})
                    .then(res=>{
                        alert(res.data.message);
                        this.getProducts();
                        productModal.hide();
                    })
                    .catch(err=>{
                        alert(err.response.data.message);
                    })
            }
        },
        createImg(){
            this.product.imagesUrl=[];
            this.product.imagesUrl.push('');
        },
        
    },
    mounted() {
        //取出瀏覽器的myToken,重新賦予到token上
        const token= document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //token 設置在 headers 內，是 axios 包裝好的語法
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
          });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });  
    },
});

app.mount('#app');