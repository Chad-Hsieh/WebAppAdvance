import axios from "axios";

const API_URL = "http://localhost:3000/api/posts";

class PostService {
    static getPosts(token) {
        return new Promise((resolve, reject) => {
            axios
                .get(API_URL, {headers: {authorization: token}})
                .then((res) => {
                    console.log("Service returned success");
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    static postOne(token, post) {
        return new Promise((resolve,reject) => {
            axios
                .post(
                    API_URL, 
                    {content: post.content},
                    {headers: {authorization: token}}
                    )
                .then((res) => {
                    console.log("Service returned success");
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }

    static readOne(token, id) {
        return new Promise((resolve,reject) => {
            axios
                .get(API_URL + "/" + id , {headers: {authorization: token}})
                .then((res) => { 
                    console.log("Service returned success");
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        })
        
    }

}


    


export default PostService;