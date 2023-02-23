export default {
    props:['isNew','product','updateProduct'],
    template:`
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!--標題-->
                <div class="modal-header bg-dark">
                    <h5 class="modal-title text-white" id="productModalLabel">
                        <span v-if='isNew===true'>新增產品</span>
                        <span v-else>編輯產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4">
                            <div class="mb-4">
                                <label class="form-label">主要圖片</label>
                                <input type="text" class="form-control" placeholder="請輸入圖片網址" v-model="product.imageUrl">
                                <img :src="product.imageUrl" alt="主要圖片" class="img-fluid mt-3">
                            </div>
                            <div v-if="Array.isArray(product.imagesUrl)">
                                <div class="mb-4" v-for="(img,key) in product.imagesUrl" :key="key+'img'">
                                    <label class="form-label">圖片網址</label>
                                    <input type="text" class="form-control" placeholder="請輸入圖片網址" v-model="product.imagesUrl[key]">
                                    <img :src="img" alt="次要圖片" class="img-fluid mt-3">
                                </div>
                                <div v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]">
                                    <button type="button" class="btn btn-outline-primary btn-sm w-100" @click="product.imagesUrl.push('')">新增圖片</button>
                                </div>
                                <div v-else>
                                    <button type="button" class="btn btn-outline-danger btn-sm w-100" @click="product.imagesUrl.pop()">刪除圖片</button>
                                </div>
                            </div>
                            <div v-else>
                                <button type="button" class="btn btn-outline-primary btn-sm w-100" @click="createImg">新增圖片</button>
                            </div>
                            
                            
                        </div>
                        <div class="col-8">
                            <div class="mb-3">
                                <label class="form-label">產品名稱</label>
                                <input type="text" class="form-control"  placeholder="請輸入產品名稱" v-model="product.title">
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label">分類</label>
                                        <input type="text" class="form-control"  placeholder="請輸入分類" v-model="product.category">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label">單位</label>
                                        <input type="text" class="form-control"  placeholder="請輸入單位" v-model="product.unit">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div>
                                        <label class="form-label">原價</label>
                                        <input type="text" class="form-control"  placeholder="請輸入原價" min="0" v-model.number="product.origin_price">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div>
                                        <label class="form-label">售價</label>
                                        <input type="text" class="form-control"  placeholder="請輸入售價" min="0" v-model.number="product.price">
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="mb-3">
                                <label class="form-label">產品描述</label>
                                <textarea class="form-control" rows="2" placeholder="請輸入產品描述" v-model="product.description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">說明內容</label>
                                <textarea class="form-control" rows="2" placeholder="請輸入說明內容" v-model="product.content"></textarea>
                            </div>
                            <div>
                                <div class="mb-3">
                                    <input class="form-check-input" type="checkbox" id='is_enabled' v-model='product.is_enabled' :true-value='1' :false-value='0'>
                                    <label class="form-check-label" for="is_enabled">
                                        是否啟用
                                    </label>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
            </div>
        </div>
    `,

};