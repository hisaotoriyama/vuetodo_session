var app = new Vue({
  el: "#app",
  data: {
    newItem: "",
    name_selected: "",
    todos:"",
    isDonetodos:""
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

    deleteItem:function(){
      var self = this;
      self.isDonetodos = self.todos.filter((v)=> {
        return(v.isDone=1);
        });
      console.log(isDonetodos);  


    //List　をforEach[]
    //for Eachごとに通信。で一個一個飛ばす。

    //this.todos.splice(index,1)

    //delete.全て終わったら、次にAjax
    //readにて

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
        self.todos = j;})}).then(console.log(self.todos))
     }
  }
})
