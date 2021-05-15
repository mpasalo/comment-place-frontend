<template>
    <div class="border-left container">
        <p class="text-left">
            <b
                ><a-icon type="user" :style="{ fontSize: '24px' }" />{{
                    comment.user_name
                }}</b
            >
        </p>
        <p class="text-left ml-5">
            {{ comment.body }}
        </p>
        <div class="text-left ml-5">
            <button class="btn btn-info btn-sm" @click="isVisible = !isVisible">
                <a-icon type="edit" /> Reply
            </button>
        </div>
        <div class="row text-center" v-if="isVisible">
            <input
                class="col-md-4 form-control"
                type="text"
                v-model="form.user_name"
                placeholder="Enter your Name"
            />
            <div class="row col-md-8">
                <input
                    class="col-md-8 form-control"
                    type="text"
                    v-model="form.comment"
                    placeholder="Reply to comment..."
                />
                <button
                    class="col-md-4 btn btn-primary"
                    @click="onClickSubmit(comment.id)"
                >
                    Reply
                </button>
            </div>
        </div>
        <div
            class="border-top pb-3 mt-3"
            v-for="comment in updatedComment.replies"
            :key="comment.id"
        >
            <SecondaryComments :comment="comment" />
        </div>
    </div>
</template>

<script>
import { Form } from "vform";
import { Icon } from "ant-design-vue";
import SecondaryComments from "./SecondaryComments.vue";

export default {
    name: "Comments",
    props: ["comment"],

    components: {
        "a-icon": Icon,
        SecondaryComments,
    },

    data() {
        return {
            isVisible: false,
            username: "",
            updatedComment: this.comment,
            form: new Form({
                user_name: "",
                comment: "",
            }),
        };
    },

    watch: {
        comment: function(newVal) {
            this.updatedComment = newVal;
        },
    },

    methods: {
        onClickSubmit: function(id) {
            let formData = new FormData();

            formData.append("parent_id", id);
            formData.append("user_name", this.form.user_name);
            formData.append("comment", this.form.comment);

            let data = {
                formData: formData,
            };

            this.$store
                .dispatch("saveSecondaryComment", data)
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
                        this.isVisible = false;
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
