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
  console.log(transaction)

  if(transaction.type==="deposit"||transaction.type==="withdraw"){
    
  }
  else{
   
  }
  $.ajax({
    url:"http://localhost:3000/transactions",
    type:"get",
    contentType:"application/json",
    dataType:"json"
  }).done((data)=>{
    console.log(data)
  })
}