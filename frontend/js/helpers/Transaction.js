// import { getAllTransactions } from "../../../src/transactions";

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

let newTransaction=(transaction)=>{ 
  let userId="";
  let toId="";
  let fromId="";
  $.ajax({
    url:"https://final-proyect-trackr.herokuapp.com/accounts",
    type:"get",
    contentType:"application/json",
    dataType:"json"
  }).done((data)=>{
    data.forEach((account)=>{
      if(account.username===transaction.name){
        return userId=account.id
      }
      if(account.username===transaction.from){
        return fromId=account.id;
      }
      if(account.username===transaction.to){
        return toId=account.id;
      }
    })})
    console.log(userId+' '+toId+" "+ fromId)
  if(transaction.type==="deposit"||transaction.type==="withdraw"){
    return  $.ajax({
      url:"https://final-proyect-trackr.herokuapp.com/transaction",
      type:"post",
      contentType:"application/json",
      dataType:"json",
      data:JSON.stringify({
        newTransaction:{
          accountId:7,
          accountIdFrom:7,
          accountIdTo:7
          // username:`${transaction.name}`,
          // type:`${transaction.type}`,
          // category:`${transaction.category}`,
          // amount:`${transaction.amount}`,
          // description:`${transaction.descript}`
        }
      })
    })
   
  }
  else{
    return  $.ajax({
      url:"http://localhost:3000/transaction",
      type:"post",
      contentType:"application/json",
      dataType:"json",
      data:JSON.stringify({
        newTransaction:{
          accountId:7,
          accountIdFrom:7,
          accountIdTo:7
          // from:`${transaction.from}`,
          // to:`${transaction.to}`,
          // type:`${transaction.type}`,
          // category:`${transaction.category}`,
          // amount:`${transaction.amount}`,
          // description:`${transaction.descript}`
        }
      })
    })
  
  }

}