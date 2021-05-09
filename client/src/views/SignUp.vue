<template>
  <div class="SignUp">
    <h2>SignUp</h2>
    <form name="signUpForm" @submit.prevent="handleSignup">
        <div v-if="message" id="message">{{message}}</div>
        <div class="form_row">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email" />
        </div>
        <div class="form_row">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password" />
        </div>
        <div class="form_row">
            <button :disabled="submitted">
                <span>Sign Up</span>
            </button>
        </div>
    </form>
  </div>
</template>

<script>
import AuthService from "@/services/auth";

export default {
    name: "SignUp",
    data(){
        return{
            submitted: false,
            message: "",
            email: "",
            password: "",
        };
    },
    methods: {
        handleSignup() {
            console.log("Sign Up Pressed");
            this.submitted = true;
            if(this.email != "" & this.password != ""){
                AuthService.signup({
                    email: this.email,
                    password: this.password,
                })
                    .then((user) => {
                        console.log(user);
                        this.message = "User Created";
                        this.$router.push("/login"); //send the user to login page
                    })
                    .catch((err) => {
                        console.log(err);
                        this.message = "Email already taken";
                        this.submitted = false;
                    })
            }else{
                this.message = "Email and Password required."
                this.submitted = false;
            }
            
        }
    }
};
</script>
