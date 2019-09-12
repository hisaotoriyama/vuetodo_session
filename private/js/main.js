// import { Session } from "inspector";

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
    revisedTodos:"",
    loginName:"",
    loginPassword:"",
    newName:"",
    newPassword:"",
    userLists:""
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
  mounted:　function() {
    console.log(req.cookies.name);
    this.name_selected=req.cookies.name;
    this.readItem(this.name_selected)
  },

  methods: {
    addItem: function(event) {
      if (this.newItem == "") return;
      const data = {
        "name": this.name_selected,//ここにname_selectedを入れず、/controller/vuetodo にてres.session.nameを入れる。
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
      fetch('/vuetodos', d).then((d) => {
        return new Promise((res,rej) => {
          d.json().then((j) => {
            self.todos = j;
            res();
          })
        })
      })
      .then((res) => this.readItem()
      );
      this.newItem = ""
    },

    readItem: function() {
      console.log("readitem")
      const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      };
      const d = {
         headers: headers,
         method: "GET"
      };
      var self = this
      //this.name_selected = req.session.name;
      //console.log(req.session.name)
      fetch('/vuetodos', d).then((d) => {
       return new Promise((res, rej) => {
         d.json().then((j) => {
           self.todos = j;
           res(); // resolve
         })
       })
     })
     .then(console.log(self.todos))
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
      return fetch('/vuetodos/'+deleteId.id, d);
    },

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

    reviseItem:function(){
      var self = this;
      self.revisedTodos = self.todos.filter((v)=> {
        return(v.revisedTodo!="");
        });
      // console.log(self.revisedTodos);
      Promise.all(
          self.revisedTodos.map((v) => {
            this.selectedrevise(v)
          })).then((response) => this.readItem()
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
      return fetch('/vuetodos/'+v.id, d);
    },

    createUser:function(){
      if (this.newName == "") return;
      const data = {
        "name": this.newName,
        "email":"",
        "password": this.newPassword
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
      fetch('/vuetodos/users', d).then((d) => {
        return new Promise((res,rej) => {
          d.json().then((j) => {
            self.userLists = j;
            res();
          })
        })
      })
      .then((res) => this.readUser()
      );
      this.newName = "";
      this.email="";
      this.newPassword="";
    },

    readUser:function(){
      const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      };
      const d = {
         headers: headers,
         method: "GET"
      };

      var self = this;
      fetch('/vuetodos/users', d).then((d)=>{
       return new Promise((res, rej) => {
         d.json().then((j) => {
           self.userLists = j;
           res(); // resolve
         })
       })
     })
     .then(console.log(self.userLists))
    },

    loginUser:function(){

    }
  }
});