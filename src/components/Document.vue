<template>
  <section class="ui stackable two column grid">
    <div class="thirteen wide column document-description section">
      <h2>{{document.title}}</h2>
      <p v-html="document.content"></p>
    </div>
    <div class="three wide column ui secondary vertical menu buttons">
      <div class="item">
        <div class="ui positive basic button">修改</div>
      </div>
      <div class="item">
        <div class="ui secondary basic button">修改历史</div>
      </div>
      <div class="item">
        <div class="ui secondary basic button">打印</div>
      </div>
      <div class="item">
        <div class="ui negative basic button">删除</div>
      </div>
    </div>
  </section>
</template>

<style>
  .document-description > h2 {
    font-weight: normal;
    font-size: 1.65em;
    margin-bottom: 1.15em;
  }
  .document-description > p {
    font-size: 1.2em;
    text-align: justify;
  }
  .document-description {
    padding-bottom: 2em;
  }
  .ui.secondary.vertical.menu.buttons {
    margin-top: 0;
  }
  .ui.secondary.vertical.menu.buttons .item {
    padding: 0.78571429em 1.35em;
    margin-bottom: 0;
  }
  .ui.secondary.vertical.menu.buttons .item .button {
    padding: 0.75071429em 1.25em;
  }
</style>

<script>
  export default {
    name: 'document',
    props: ['document']
  }
</script>
