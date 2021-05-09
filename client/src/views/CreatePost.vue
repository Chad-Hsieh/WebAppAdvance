<template>
    <div>
        <div>
           <h1>Create Post here</h1>
           <div v-if="message" id="message">{{message}}</div>
            <textarea v-model="content" placeholder="add multiple lines" rows="10" cols="50"></textarea> 
        </div>
        <br>
        <div>
            <button :disabled="submitted" v-on:click="handleSubmit">
                <span>Submit</span>
            </button>
        </div>
    </div>
</template>

<script>
import PostService from "@/services/post";

export default {
    data(){
        return{
            message: "",
            submitted: false,
            content: "",
        };
    },
    methods: {
        handleSubmit(){
            console.log("Submit pressed");
            this.submitted = true;
            if (this.$store.getters.loggedIn){
                if(this.content != ""){
                    const token = this.$store.getters.token;
                    PostService.postOne(token, {content: this.content})
                        .then(() =>{
                            this.message = "Post Created";
                            this.$router.push("/posts")
                        })
                        .catch((err) => {
                            console.log(err)
                            this.message = "Post Failed";
                            
                        })
                }else{
                    this.message = "Please enter content";
                    this.submitted = false;
                }
                
            }
            else{
                this.message = "You must login first"
            }
            
        }
        
    }
}
</script>


<style scoped>
textarea{
    resize: none;
    size: 10px;
}
</style>