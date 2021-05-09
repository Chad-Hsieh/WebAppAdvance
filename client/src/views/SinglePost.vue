<template>
    <div>
        <div class="messages" v-if="this.message">
            {{ this.message }}
        </div>
        <!-- <div v-for="post in this.OnePost" :key="post._id">
            {{post.content}}
        </div> -->
        <div class="word">
            <div>
                <p>Post Id: {{OnePost._id}}</p>
            </div>
            <div>
                <p>Post Content: {{OnePost.content}}</p>                
            </div>
            <div v-if="OnePost.author">
                <p>Post Author ID: {{OnePost.author._id}}</p>                
            </div>
            <div v-if="OnePost.author">
                <p>Post Author Email: {{OnePost.author.email}}</p>                
            </div>
            <div>
                <p>Post Time: {{OnePost.created_at}}</p>               
            </div>
        </div>
    </div>
</template>

<script>
import PostService from "@/services/post";
import { EventBus } from '@/main.js';

    var Idd = "";
    EventBus.$on('i-got-clicked', certainId => {
        console.log(`Receive postId: ${certainId}`)
        Idd = `${certainId}`
        // console.log('this is idd: ' + typeof(Idd))
    });

export default {
    data() {
        return {
            OnePost: [],
            message: "Loading Post",
        };
    },
    mounted(){
        if (this.$store.getters.loggedIn) {
            const token = this.$store.getters.token;
            PostService.readOne(token, Idd)
                .then((data) => {
                    this.OnePost = data;
                    this.message = null;
                })
                .catch((err) => {
                    console.log("Error getting posts: ", err);
                    this.message = "Error getting posts";
                });
        }else{
            this.message = "You must login first"
        }
    },
}
</script>

<style scoped>

</style>