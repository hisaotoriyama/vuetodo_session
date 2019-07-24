var app = new Vue({
  el: "#app",
  data: {
    newItem: "",
    name_selected: "",
    todos:""
  },
  
  // created/mountedにていつもmysqlをReadして表示
  // created: function(){
  //   self=this;
  //   axios.get('http://localhost:3020/').then(function(res){
  //     console.log(res);
  //   }).catch(function(err){
  //     console.log(err);
  //   })
  // },

  created:　function() {
  },

  methods: {
    addItem: function(event) {
      if (this.newItem == "") return;
      const data = {
        "name": this.name_selected,
        "email":"",
        "item": this.newItem
      };
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const d = {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data) 
      };
      var self = this;
      fetch('http://localhost:3020/vuetodos', d).then((d) => {d.json().then((j) => {
      self.todos = j
      }
      )})
      this.newItem = ""
    },

    deleteItem:function(index){
    //alert(index);

    this.todos.splice(index,1)
    // このタイミングでmysqlにてDelete
    
  
  },



    readItem: function() {
      const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      };
      const d = {
         headers: headers,
         method: "GET"
      };
      var self = this
      fetch('http://localhost:3020/vuetodos?name=' + this.name_selected, d).then((d) => {d.json().then((j) => {
        self.todos = j
      }
      )})
      console.log(self.todos)
     }
    }
})
