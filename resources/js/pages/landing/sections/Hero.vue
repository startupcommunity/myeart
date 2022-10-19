<template>
    <div class="h-[30rem] sm:h-[48rem] z-[1] hero-area hero-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 offset-lg-2 text-center">
                    <div class="hero-text">
                        <div class="hero-text-tablecell">
                            <h1 class="text-white lg:text-2xl">
                                El
                                <span class="text-primary">arte</span> que todos
                                llevamos dentro
                            </h1>
                            <div
                                class="hero-btns d-flex justify-content-center"
                            >
                                <div class="input-group" style="width: 80%">
                                    <input
                                        type="text"
                                        style="height: 50px"
                                        class="form-control"
                                        aria-label="Text input with dropdown button"
                                    />
                                    <div class="input-group-append">
                                        <button
                                            class="btn btn-primary px-5 dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            OBRAS
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">
                                                Action
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Hero",
};
</script>
