<template>
    <div class="container">
        <div v-for="post in updatedPosts" :key="post.id">
            <h1>{{ post.title }}</h1>
            <p>{{ post.body }}</p>
            <div class="row text-center">
                <input
                    class="col-md-4 form-control"
                    type="text"
                    name="email"
                    v-model="form.user_name"
                    placeholder="Enter your Name"
                />
                <div class="row col-md-8">
                    <input
                        class="col-md-8 form-control"
                        type="text"
                        name="email"
                        v-model="form.comment"
                        placeholder="Add a comment..."
                    />
                    <button
                        class="col-md-4 btn btn-primary"
                        @click="onClickSubmit(post.id)"
                    >
                        Add Comment
                    </button>
                </div>
            </div>
            <div
                class="border-bottom pb-3 mb-3"
                v-for="comment in post.comments"
                :key="comment.id"
            >
                <Comments :comment="comment" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Form } from "vform";
import Comments from "./Comments.vue";

export default {
    name: "Layout",
    created: function() {
        this.$store.dispatch("fetchPosts");
    },
    components: {
        Comments,
    },

    computed: {
        ...mapGetters({
            posts: "posts",
        }),
    },
    data() {
        return {
            updatedPosts: [],
            form: new Form({
                user_name: "",
                comment: "",
            }),
        };
    },

    watch: {
        posts: function() {
            this.updatedPosts = this.posts;
        },
    },

    methods: {
        onClickSubmit: function(id) {
            let formData = new FormData();

            formData.append("post_id", id);
            formData.append("user_name", this.form.user_name);
            formData.append("comment", this.form.comment);

            let data = {
                formData: formData,
            };

            this.$store
                .dispatch("saveComment", data)
                .then((response) => {
                    this.$store.dispatch("fetchPosts");
                    this.isVisible = false;
                    this.form.user_name = "";
                    this.form.comment = "";
                    if (response.data.message === "success") {
                        this.$swal({
                            title: "Comment",
                            html: "Comment Succesfully Added",
                            icon: "success",
                            confirmButtonText: "Ok",
                        });
                    }
                })
                .catch((error) => {
                    let arr = [].concat.apply(
                        [],
                        [
                            error.response.data.errors.user_name,
                            error.response.data.errors.comment,
                        ]
                    );
                    let errors = arr.filter(function(e) {
                        if (e) {
                            return e;
                        } else {
                            return null;
                        }
                    });
                    this.$swal({
                        title: "Comment",
                        html: errors,
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                });
        },
    },
};
</script>
