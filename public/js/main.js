var app = new Vue({
  el: "#app",
  data: {
    newItem: "",
    name_selected: "",
    todos:"",
    isDonetodos:"",
    deleteId:"",
    deleteItem:"",
    revisedTodo:"",
    revisedTodos:""
  },
  // created/mountedにていつもmysqlをReadして表示したい。
  // created: function(){
  //   self=this;
  //   axios.get('http://localhost:3020/').then(function(res){
  //     console.log(res);
  //   }).catch(function(err){
  //     console.log(err);
  //   })
  // },
  created:　function() {
    this.readItem()
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

    selectedDelete:function(deleteId){
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const d = {
      headers: headers,
      method: "DELETE" 
      };
      var self = this;
      //（重要論点）fetchはPromise返す。
      return fetch('http://localhost:3020/vuetodos/'+deleteId.id, d);
    },
    //（重要論点）return fetchとしてfetchにてPromise返している。よってこれは不要となった
    // proSelectedDelete:function(i){
    //     return new Promise((res,rej)=>{
    //       selectedDelete(i)
    // })},
    

    delistItem: function(){
      var self = this;
      self.isDonetodos = self.todos.filter((v)=> {
        return(v.isDone===true);
        });
      // console.log(self.isDonetodos);
      var p = Promise.all(
      self.isDonetodos.map((v) => {
        this.selectedDelete(v)
      }));
      p.then((response) => this.readItem()
      ); 
    },

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
      fetch('http://localhost:3020/vuetodos?name=' + this.name_selected, d).then((d) => {
       return new Promise((res, rej) => {
         d.json().then((j) => {
           self.todos = j;
           res(); // resolve
         })
       })
     })
     .then(console.log(self.todos))
    },

    reviseItem:function(){
      var self = this;
      self.revisedTodos = self.todos.filter((v)=> {
        return(v.revisedTodo!="");
        });
      console.log(self.revisedTodos);
      var r = Promise.all(
          self.revisedTodos.map((v) => {
            this.selectedrevise(v)
          }));
          p.then((response) => this.readItem()
          ); 
    },

    selectedrevise:function(v) {
      const data ={
        "item": v.revisedTodo
      };
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const d = {
      headers: headers,
      method: "PUT",
      body: JSON.stringify(data) 
      };
      return fetch('http://localhost:3020/vuetodos/'+v.id, d);
    }
  }
});