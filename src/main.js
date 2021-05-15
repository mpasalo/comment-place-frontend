import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import "bootstrap/dist/css/bootstrap.css";
import api from "./api";
import * as types from "./mutation-types";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "ant-design-vue/dist/antd.css";

Vue.use(Vuex);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        selectedPlace: "",
        posts: [],
        comments: [],
        secondaryComments: [],
        tertiaryComments: [],
    },
    getters: {
        posts(state) {
            return state.posts;
        },
        comments(state) {
            return state.comments;
        },
        secondaryComments(state) {
            return state.secondaryComments;
        },
        tertiaryComments(state) {
            return state.tertiaryComments;
        },
    },
    mutations: {
        [types.POSTS](state, payload) {
            state.posts = payload;
        },
        [types.COMMENTS](state, payload) {
            state.comments = payload;
        },
        [types.SECONDARY_COMMENTS](state, payload) {
            state.secondaryComments = payload;
        },
        [types.TERTIARY_COMMENTS](state, payload) {
            state.tertiaryComments = payload;
        },
    },

    actions: {
        fetchPosts(context) {
            api()
                .get("/posts")
                .then((response) =>
                    context.commit(types.POSTS, response.data.posts)
                );
        },

        fetchComments(context, payload) {
            api()
                .get(`/comments/${payload.id}`)
                .then((response) =>
                    context.commit(types.COMMENTS, response.data.comments)
                );
        },

        fetchSecondaryComments(context, payload) {
            api()
                .get(`/secondary-comments/${payload.id}`)
                .then((response) =>
                    context.commit(
                        types.SECONDARY_COMMENTS,
                        response.data.comments
                    )
                );
        },

        fetchTertiaryComments(context, payload) {
            api()
                .get(`/tertiary-comments/${payload.id}`)
                .then((response) =>
                    context.commit(
                        types.TERTIARY_COMMENTS,
                        response.data.comments
                    )
                );
        },

        saveComment(context, data) {
            return api().post(`/comments`, data.formData);
        },

        saveSecondaryComment(context, data) {
            return api().post(`/secondary-comments`, data.formData);
        },

        saveTertiaryComment(context, data) {
            return api().post(`/tertiary-comments`, data.formData);
        },
    },
});

new Vue({
    render: (h) => h(App),
    store: store,
}).$mount("#app");
