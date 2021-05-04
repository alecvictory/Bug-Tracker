<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col-md-12  text-center text-white">
        <div class="mt-5">
          <h1>
            Welcome To
          </h1>
        </div>
        <div class="mx-2 icon">
          <i class="fa fa-bug" style="font-size:160px"> Out</i>
        </div>
        <div class="text-center mt-5">
          <h1>
            <div>
              WHY ARE YOU STILL HERE?!?
            </div>
            <div>
              GO TO YOUR
            </div>
            <router-link :to="{ name: 'BugsPage' }" class="nav-link">
              "Bugs Page"
            </router-link>
            TO REPORT A BUG
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
