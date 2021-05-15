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
    </div>
</template>

<script>
import { Icon } from "ant-design-vue";

export default {
    name: "TertiaryComments",
    props: ["comment"],

    components: {
        "a-icon": Icon,
    },

    data() {
        return {
            isVisible: false,
        };
    },
};
</script>
