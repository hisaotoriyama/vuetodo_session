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

    //稼働確認済み
    selectedDelete:function(deleteId){
      alert("just start this.selectedDelete!");
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const d = {
      headers: headers,
      method: "DELETE" 
      };
      var self = this;
      fetch('http://localhost:3020/vuetodos/'+deleteId, d);
    },
    //非稼働と思われる。
    proSelectedDelete:function(i){
        return new Promise((res,rej)=>{
          selectedDelete(i)
    })},
    
    //前半稼働している
    delistItem: function(){
      alert("just start delistItem!");
      var self = this;
      self.isDonetodos = self.todos.filter((v)=> {
        return(v.isDone===true);
        });
      console.log(self.isDonetodos);

      //以上まで行った。以下は非稼働と思われる。  
      var p = Promise.all(
      self.isDonetodos.forEach((v) => {
        this.proSelectedDelete(v)
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
      fetch('http://localhost:3020/vuetodos?name=' + this.name_selected, d).then((d) => {d.json().then((j) => {
        self.todos = j;})}).then(console.log(self.todos))
    }
  }
});