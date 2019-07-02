<template>
    <div class="LibraryForm">
        <p>移动批次</p>
        <el-form ref="libraryForm" :model="libraryForm"  :rules="libraryFormRules">
            <el-form-item prop="carNumber"> 
                <el-input 
                    ref="carNumber" 
                    v-model="libraryForm.carNumber" 
                    placeholder="车次号"></el-input>
            </el-form-item>
            <el-form-item prop="date" label="移动时间" class="date">
                <el-col :span="11">
                    <el-date-picker
                        ref="date" 
                        type="date" 
                        placeholder="移动时间" 
                        v-model="libraryForm.date" 
                        style="width:100%"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item prop="moveNumber">
                <el-input 
                    ref="moveNumber"
                    v-model="libraryForm.moveNumber"
                    placeholder="移动单号"></el-input>
            </el-form-item>
            <el-form-item prop="moveDirection">
                <el-input 
                    ref="moveDirection"
                    v-model="libraryForm.moveDirection" 
                    placeholder="移动方向"></el-input>
            </el-form-item>
            <el-button>确定</el-button>
        </el-form>

    </div>
</template>
<script>
export default {
    data(){
        return{
            libraryForm:{
                carNumber:'',
                date:'',
                moveNumber:'',
                moveDirection:''
            },
            libraryFormRules:{
                carNumber:[{required: true, trigger: 'blur',message:'车次号不能为空'}],
                date:[{required: true, trigger: 'blur',message:'请您填写移动日期'}],
                moveNumber:[{required: true, trigger: 'blur',message:'移动单号不能为空'}],
                moveDirection:[{required: true, trigger: 'blur',message:'请填写移动方向'}],

            }
        }
    },
    mounted(){
        if (this.libraryForm.carNumber === ''){
            this.$refs.carNumber.focus()
        } else if(this.libraryForm.date === ''){
            this.$refs.date.focus()
        } else if(this.libraryForm.moveNumber === ''){
            this.$refs.moveNumber.focus()
        } else if(this.libraryForm.moveDirection === ''){
            this.$refs.moveDirection.focus()
        } 
    }
}
</script>

<style>
.LibraryForm{
    display: flex;
    width: 50%;
    justify-content: center;
    border:3px solid black;
    height: 600px;
}
.el-form-item{
    margin:10px;
    border:3px solid black;
    width:50%;
}
.date{
    height:100px;
    width:100px;
}
</style>

