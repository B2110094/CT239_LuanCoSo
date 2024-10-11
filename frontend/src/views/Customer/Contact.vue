<script>
    export default {
        methods: {
            async alertNotify(){
                alert('Cảm ơn bạn đã gửi nhận xét !')
                this.$router.push({name:'HomePage'})
            }
        }
    }
</script>

<template>
    <div class="container" id="main_page_contact">
        <div class="container" id="main_content">
            <h3>VIẾT NHẬN XÉT</h3>
            <hr>
            <div class="row">
                <form v-on:submit.prevent="alertNotify()">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Tên của bạn:</label>
                        <input type="text" class="form-control" name="usernameInput" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                        <div id="emailHelp" class="form-text"></div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" name="emailInput" aria-describedby="emailHelp" required>
                    </div>

                    <div class="form-floating">
                        <textarea required class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name="commentInput" style="height: 100px"></textarea>
                        <label for="floatingTextarea2">Viết bình luận</label>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Gửi liên hệ</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
#main_page_contact {
    height: 100%;
}

#main_content {
    border: 2px solid red;
    margin: 50px;
    padding: 50px;
    border-radius: 10px;
}

span {
    color: red;
    font-weight: bold;
}
</style>