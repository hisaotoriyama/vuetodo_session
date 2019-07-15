// import { ForeignKeyConstraintError } from "sequelize/types";

var app = new Vue({
  el: "#app",
  data: {
    newItem: "",
    todos: []
  },

  // created/mountedにていつもmysqlをReadして表示
  created: function(){
    self=this;
    axios.get('http://localhost:3020/vuetodos/').then(function(res){
      console.log(res);
    }).catch(function(err){
      console.log(err);
    })
  },


  methods: {
    addItem: function(event) {
      //alert();
      if (this.newItem == "") return;
      var todo = {
        item: this.newItem,
        isDone: false
      };
      this.todos.push(todo);
      this.newItem = "";

      // このタイミングでmysqlにCreate
    },
    deleteItem:function(index){
    //alert(index);

    this.todos.splice(index,1)
    // このタイミングでmysqlにてDelete
    }}

})
