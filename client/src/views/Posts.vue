<template>
    <div class="posts">
        <h2>Posts</h2>
        <router-link :to="{ name: 'CreatePost'}" class="links">Clike Here To Create Post</router-link>
        <div class="messages" v-if="this.message">
            {{ this.message }}
        </div>
        <div id="posts">
            <div class="post" v-for="post in this.posts" :key="post._id">
                <p class="class">
                    Content: {{ post.content }}
                    <router-link :to="{ name: 'SinglePost'}">
                        <span @click="emitGlobalClickEvent($event, post._id)">Detail</span>
                    </router-link>
                    
                </p>
                
            </div>
        </div>    
    </div>

    

</template>

<script>
import PostService from "@/services/post";
import { EventBus } from '@/main.js';

export default {
    data() {
        return {
            posts: [],
            message: "Loading Posts",
        };
    },
    mounted(){
        console.log("Load Posts Here.");
        if (this.$store.getters.loggedIn) {
            const token = this.$store.getters.token;
            PostService.getPosts(token)
                .then((data) => {
                    this.posts = data;
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
    methods: {
        handleDetail: function (event, id) {
            console.log(id)
        },
        emitGlobalClickEvent(event, id) {
            console.log("sending postId to SinglePost.vue: " + id);
            this.certainId = id;
            // Send the event on a channel (i-got-clicked) with a payload (the click count.)
            EventBus.$emit('i-got-clicked', this.certainId);
        }
    },
};
</script>

<style scoped>

</style>