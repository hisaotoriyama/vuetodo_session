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
        fetch('/vuetodos?name=' + this.name_selected, d).then((d) => {
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
        fetch('/users', d).then((d) => {
          return new Promise((res,rej) => {
            d.json().then((j) => {
              self.userLists = j;
              res();
            })
          })
        })
        .then((res) =>  res.redirect('../private/todo.html',this.newName)
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
        fetch('/users', d).then((d)=>{
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
        //   name, passwordを確認する。
        //   cookes
        //   成功したら、次にtodohtmlのシート、しかも自分のシートに移る
  
      },

      login: function(){
        const data = {
          "loginName": this.loginName,
          "loginPassword": this.loginPassword
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
        fetch('/login', d).then((d) => {
          location.href = "/secure/todo.html"
        })


      }

    }
  });