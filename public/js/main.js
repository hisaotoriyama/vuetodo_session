var app = new Vue({
  el: "#app",
  data: {
    newItem: "",
    name_selected: "",
    todos:"",
    isDonetodos:"",
    deleteId:"",
    deleteItem:""
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
      )});
      this.newItem = ""
    },
    selectedDelete:function(){
      alert("just start this.selectedDelete!");
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const d = {
      headers: headers,
      method: "DESTROY" 
      };
      var self = this;
      console.log(self.deleteId);
      fetch('http://localhost:3020/vuetodos/:'+self.deleteId, d);
    }, 
    // deleteItem:function(){
    //   var self = this;
    //   self.isDonetodos = self.todos.filter((v)=> {
    //     return(v.isDone===true);
    //     });
    //   Promise.all([
    //     self.isDonetodos.forEach(
    //       (v) => {
    //         selectedDelete()
    //       }, result);
    //     ]).then((res)=> readItem())
    // },
    readItem: function(){
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
        self.todos = j;})}).then(console.log(self.todos))
    }
  }
});