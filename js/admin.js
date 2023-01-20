const {createApp} = Vue;


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
            pages:{
                current_page:1,
                has_next:false,
                has_pre:false,
                total_pages:3,
            }

        }
    },
    methods: {
        checkLogin(){
            axios.post(`${url}api/user/check`)
                .then(res=>{
                    this.getProducts();
                })
                .catch(err=>{
                    alert(err.message);
                })
        },
        getProducts(){
            axios.get(`${url}api/${path}/admin/products`)
                .then(res=>{
                    this.productList = res.data.products;
                })
                .catch(err=>{
                    alert(err.message);
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
        
    },
    mounted() {
        //取出瀏覽器的myToken,重新賦予到token上
        const token= document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //token 設置在 headers 內，是 axios 包裝好的語法
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    },
});
app.component('pagination',{
    props:['pages'],
    template:`#pagination`,
    methods: {
        pagesAdd(item){
            this.pages.current_page = item;
        }
    },
})
app.component('productModal',{
    props:['isNew','product'],
    template:'#productModal',
    data(){
        return{

        }
    },
    methods:{
        updateProduct(){
            if(this.isNew===true){
                axios.post(`${url}api/${path}/admin/product`,{data:this.product})
                    .then(res=>{
                        alert(res.data.message);
                        this.$emit('update');
                        this.hideModal();
                    })
                    .catch(err=>{
                        alert(err.data.message);
                    })
            }else if(this.isNew===false){
                const id = this.product.id;
                axios.put(`${url}api/${path}/admin/product/${id}`,{data:this.product})
                    .then(res=>{
                        alert(res.data.message);
                        this.$emit('update');
                        this.hideModal();
                    })
                    .catch(err=>{
                        alert(err.message);
                    })
            }
        },
        createImg(){
            this.product.imagesUrl=[];
            this.product.imagesUrl.push('');
        },
        openModal(){
            productModal.show();
        },
        hideModal(){
            productModal.hide();
        }
    },
    mounted(){
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
          });
    }
});
app.component('delProductModal',{
    props:['delTempProduct'],
    template:`#delProductModal`,
    methods:{
        delProduct(){
            axios.delete(`${url}api/${path}/admin/product/${this.delTempProduct.id}`)
                .then(res=>{
                    alert(res.data.message);
                    this.$emit('del');
                    this.hideModal();
                })
                .catch(err=>{
                    alert(err.response.data.message);
                })
        },
        openModal(){
            delProductModal.show();
        },
        hideModal(){
            delProductModal.hide();
        }
    },
    mounted(){
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });  
    }
})
app.mount('#app');