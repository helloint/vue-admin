import {
    genderEnum,
    typEnum,
    typHash,
    getPrivilege,
    getCreateFields,
    createUser,
    getUserList,
    getUserDetail,
    getEditUserInfo,
    editUser,
    delUser,
} from "@/server/user.js"

export default{
    field_list:{
        name:{
            label:'用户名',
            editorComponent:{
                name:"field_string",
                config:{
                    placeholder:'请输入用户名',
                },
                default:'',
            },
            validator:[
                {
                    validator:function(rule,value,cb){
                        if(value.length<2){
                            cb([new Error("姓名最少两个字符")])
                        }else{
                            cb()
                        }
                    }
                }
            ],
        },
        password:{
            label:'密码',
            editorComponent:{
                name:"field_pwd",
                config:{
                    placeholder:'请输入密码',
                },
                default:'',
            },
            validator:[
                {
                    validator(rule,value,cb){
                        if(value.length>15){
                            cb([new Error('密码位数最多为15位')])
                        }else{
                            cb();
                        }
                    }
                }

            ],
        },
        gender:{
            label:'性别',
            editorComponent:{
                name:"field_sex",
                default:0,
            },
            showComponent:{
                name:"view_enum",
                path:"components/common/views/view_enum",
                config:{
                    enums:genderEnum,
                },
            },
            tip:"暂不支持LGBT",
        },
        typ:{
            label:'类型',
            editorComponent:{
                name:"field_enum_select",
                config:{
                    candidate:typEnum,
                    valuefield:'value',
                    labelfield:'label',
                },
                default:0,
            },
            showComponent:{
                name:"view_enum",
                path:"components/common/views/view_enum",
                config:{
                    enums:typHash
                }
            }
        },
        privilege:{
            label:'权限',
            editorComponent:{
                name:"field_relates_tag",
                config:{
                    httpRequest:getPrivilege,
                    labelfield:'name',
                    valuefield:'id',
                    relates:[
                        {
                            invalidValue:0,
                            relateField:'typ',
                            requestField:'req_typ',
                        }
                    ],
                },
                default(){
                    return [];
                },
            },
        },
        desc:{
            label:"备注",
            editorComponent:{
                name:"field_text_rich",
                default:"这是富文本编辑器蛤",
            },
        }
    },
    staticOperators:[
        {
            component:"create",
            componentPath:"components/common/staticOperators/create",
            config:{
                getCreateFields:getCreateFields,
                doCreateRequest:createUser,
                triggerText:"新建用户",
            }
        },

    ],
    filters:[
        {
            label:"姓名",
            field:"username",
            editorComponent:{
                name:"field_string",
                config:{
                    placeholder:"请输入用户姓名",
                },
                default:"",
            },
        },
        {
            label:"类型",
            field:"typ",
            editorComponent:{
                name:"filter_enum",
                config:{
                    candidate:typEnum,
                    allvalue:-1,
                    alllabel:"全部",
                },
                default:-1,
            },
        },
        {
            label:"权限",
            field:"privilege",
            editorComponent:{
                name:"filter_relates_enum",
                config:{
                    httpRequest:getPrivilege,
                    valuefield:"id",
                    labelfield:"name",
                    placeholder:"请选择权限",
                    allvalue:"all",
                    alllabel:"不限",
                    relates:[
                        {
                            invalidValue:-1,
                            relateField:'typ',
                            requestField:'req_typ',
                        }
                    ],


                },
                default:"all",
            },
        },
        {
            label:"自定义filter",
            field:"test",
            editorComponent:{
                name:"test_custom_filter",
                config:{
                    msg:"测试自定义filter",
                },
                path:"components/user/test_custom_filter",
                default:"test",
            },
        }
    ],
    listConfig:{
        listRequest:getUserList,
        sortFields:['typ'],
        async treatData(data){
            return data
        },
        pageSizes:[10,20,30,50],
    },
    operators:[
        {
            component:"info",
            componentPath:"components/common/operators/info.vue",
            config:{
                title:"用户详情",
                getDetailInfo:getUserDetail,
            },
        },
        {
            component:"edit",
            componentPath:"components/common/operators/edit",
            config:{
                getEditInfo:getEditUserInfo,
                doEditRequest:editUser,
                autoValidate:false,
            }
        },
        {
            label:"搞个大新闻",
            type:"warning",
            function(resolve,data){
                this.$message({
                    message:`${data.name}不要总想着搞个大新闻`,
                    type:"success",
                    duration:2000,
                });
                setTimeout(()=>{
                    resolve();
                },1000)
            },
        },
        {
            component:"delete",
            componentPath:"components/common/operators/delete",
            config:{
                doDeleteRequest:delUser,
                triggerText:"删除用户",
            }
        }

    ],
}