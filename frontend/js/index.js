// import { getAllTransactions } from "../../src/transactions";

$(document).ready(function(){
  
  const displayFunction=()=>{
    $.ajax({
      url:"http://localhost:3000/accounts",
      type:"get",
      contentType:"application/json",
      dataType:"json"
    }).done((data)=>{
      data.forEach((account)=>{
        $("#accountSelector").append(`<option>${account.username}</option>`)
        $("#fromSelector").append(`<option>${account.username}</option>`)
        $("#toSelector").append(`<option>${account.username}</option>`)
        $("#filterSelector").append(`<option>${account.username}</option>`)
      })
    })
    $.ajax({
      url:"http://localhost:3000/categories",
      type:"get",
      contentType:"application/json",
      dataType:"json"
    }).done((data)=>{
      data.forEach((account)=>{
        $('#categoriesOption').append(`<option>${account.name.name}</option>`)
      })
  });
  };
  displayFunction();


  $('#newAccount-btn').click((event)=>{
    event.preventDefault();
    let accountName=$('#newAccountName').val();
    if(accountName!=""&&accountName!=" "){
      $.ajax({
        url:"http://localhost:3000/accounts",
        type:"get",
        contentType:"application/json",
        dataType:"json"
      }).done((data)=>{
        let existentUser;
        if(data.length==0){
          return newAccount(accountName)
       ;
        }
        data.forEach((account)=>{
        if(account.username===accountName){
          return existentUser=true;
        }
        })
        if(existentUser===true){
          alert('This user already exists')
        }
        else{
          return newAccount(accountName);
        }
      })
      
    }
  });

  $('#newCategoryInput').click((event)=>{
    event.preventDefault();
  $('#categorySection').removeClass('hidden');
  })

  $("#categoryInput-btn").click((event)=>{
    event.preventDefault();
    let categoryName=$('#categoryInput').val();
    if(categoryName!=""&&categoryName!=" "){
      $.ajax({
        url:"http://localhost:3000/categories",
        type:"get",
        contentType:"application/json",
        dataType:"json"
      }).done((data)=>{
        let existentCategory;
        if(data.length===0){
          return newCategory(categoryName);
        }
        data.forEach((category)=>{
        if(category.name.name===categoryName){
          return existentCategory=true;
        }
        })
        if(existentCategory===true){
          alert('This category already exists')
        }
        else{
          return newCategory(categoryName);
        }
      })
    }
  })

  
});

$('#submit-btn').click((event)=>{
  event.preventDefault();
  let accountName=$('#accountSelector').val();
  let category=$('#categoriesOption').val();
  let description=$('#descriptionInput').val();
  let amount=$('#amountInput').val();
  let from=$('#fromSelector').val();
  let to=$('#toSelector').val();
  let selectedVal='';
  let selected= $("#selectionOptions input[type='radio']:checked")
  if (selected.length > 0) {
    selectedVal = selected.val();
  }
  else{
    alert('choose a transaction')
  }
  
  if(selectedVal==="deposit"||selectedVal==="whitdraw"){
    if(amount!=""&&amount!=" "&&amount!=0){
      let transactionDetail={
        type:selectedVal,
        name:accountName,
        category:category,
        amount:amount,
        descript:description
      }
      return newTransaction(transactionDetail);
    }
    else{
      alert('insert amount')
    }
  }
   if(selectedVal==="transfer"){
    if(amount!=""&&amount!=" "&&amount!=0){
      if(to!=from){
        let transferDetail={
          type:selectedVal,
          from:from,
          to:to,
          category:category,
          description:description,
          amount:amount
        }
        return newTransaction(transferDetail)
      }
      else {
        alert('you can not transfer to the same account')
      }
      }
      else{
        alert('Insert an amount')
      }
  }
})



let updateSum=()=>{
  $.ajax({
    url:"http://localhost:3000/accounts",
    type:"get",
    contentType:"application/json",
    dataType:"json"
  }).done((data)=>{
    const userSelected=$('#accountSelector :selected').text();
    let index;
    data.forEach((account)=>{
      if(account.username===userSelected){
        return index=account.id-1
      }
    })
    let balance=data[index].balance;
    $("#accountSummary").html(`<li>The balance of the account is ${balance}$</li>`)
  })
}
let depositBtn=()=>{
  $('#fromtoForm').removeClass('active');
  $('#fromtoForm').addClass('hidden');
  $('#account-btn-container').removeClass('hidden');
  $('#account-btn-container').addClass('active');

};

let whitdrawBtn=()=>{
  $('#fromtoForm').removeClass('active');
  $('#fromtoForm').addClass('hidden');
  $('#account-btn-container').removeClass('hidden');
  $('#account-btn-container').addClass('active');

}

let transferBtn=()=>{
  $('#fromtoForm').removeClass('hidden');
  $('#fromtoForm').addClass('active');
  $('#account-btn-container').removeClass('active');
  $('#account-btn-container').addClass('hidden');


}

