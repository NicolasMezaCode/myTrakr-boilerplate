class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }
}



let newAccount=(value)=>{
    $.ajax({
      url:"http://localhost:3000/accounts",
      type:"post",
      contentType:"application/json",
      dataType:"json",
      data:JSON.stringify({
        newAccount:{
          username:`${value}`,
          balance:2000,
          transactions:[]
        }
      })
    }).done((data)=>{})
    $.ajax({
      url:"http://localhost:3000/accounts",
      type:"get",
      contentType:"application/json",
      dataType:"json"
    }).done((data)=>{
      let lastItem=data.length-1;
      $("#accountSelector").append(`<option>${data[lastItem].username}</option>`)
      $("#fromSelector").append(`<option>${data[lastItem].username}</option>`)
      $("#toSelector").append(`<option>${data[lastItem].username}</option>`)
      $("#filterSelector").append(`<option>${data[lastItem].username}</option>`)
    })
}