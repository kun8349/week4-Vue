const {createApp} = Vue;

createApp({
    data() {
        return {
            user:{
                username:'',
                password:'',
            },
        }
    },
    methods: {
        login(){
            axios.post(`${url}admin/signin`,this.user)
                .then(res=>{
                    console.log(res.data);
                    const { token,expired } =res.data;
                    document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
                    window.location = "admin.html"
                })
                .catch(err=>{
                    window.location = 'index.html';
                })
        },
    },
}).mount('#app');