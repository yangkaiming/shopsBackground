<template>
    <div>
        <div id="div">
        <Input v-model="valueSearch" style="width:400px" search @on-search="dataSearch">
        <Select v-model="typeValue" slot="prepend" style="width: 80px">
            <Option value="name">商店名</Option>
        </Select>
        </Input>
        <Button style="margin-left:5px" @click="newDate">刷新</Button>
    </div>
        <i-table border stripe ellipsis :content="self" :columns="columns7" :data="data6"></i-table>
        <Page :total="allRows" :current="page" :page-size="rows"  @on-change="handlePage"/>
    </div>
</template>
<script>
import Axios from "axios"
import { ip1 } from "../../static/default_item.js"
    export default {
        data () {
            return {
                self: this,
                columns7: [{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '商店名',
                        align: 'center',
                        key: 'name'
                    },
                      {
                        title: '商店编号',
                        align: 'center',
                        key: '_id'
                    },
                    {
                        title: '商铺LOGO',
                        align: 'center',
                        key: 'logo',
                        render:(h, params) => {
                             return h('div', [
                                h('img', {
                                    attrs: {
                                    src: ip1 + params.row.logo,

                                        },
                                    style: {
                                    width: "40px",
                                    height: "40px",
                                    marginTop: '5px'
                                    },
                            }),
                             ], '处理')
                        }
                    },
                        {
                        title:"收藏人数",
                        align: 'center',
                        key:"fans"
                    }
                ],
                data6:[],
                allRows:0,
                value:"",
                key:"",
                valueSearch:"",
                typeValue:"name",
                texts:"分类搜索",
                page:1,//当前页数
                rows:10//当前条数
            }
        },
        methods: {
             handlePage(value) {            //value是当前的页数
            this.page = value
            if(this.valueSearch){
                 Axios.get(ip1+"/manage_shops/searchData",{params:{name:this.valueSearch,isOpen:"true",page:this.page,rows:this.rows}}).then((msg)=>{
                    this.data6=[...msg.data.rows];
                    this.allRows=msg.data.total
                })
            }else{
                this.allFuc()
            }
            },
            dataSearch(){              //搜索值
            let type=this.typeValue
            let value=this.valueSearch
            this.handlePage()
            },
            newDate(){       //刷新按钮                               
             this.allFuc()
            this.valueSearch=""
            },
            allFuc(){//初始化axios
                 Axios.get(ip1+"/manage_shops/getData",{params:{page:this.page,rows:this.rows,isOpen:"true"}}).then((msg)=>{
                    this.data6=[...msg.data.rows];
                    this.allRows=msg.data.total;
            }) 
            }
    },
        beforeMount:function(){
           this.allFuc()
        }
    }
</script>
<style scoped>

#div{
    display: flex;

}
</style>
