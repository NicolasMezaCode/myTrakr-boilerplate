let newCategory=(value)=>{
    $.ajax({
        url:"http://localhost:3000/categories",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            newCategory:{
                name:`${value}`
            }
        })
      }).done((data)=>{})
      $.ajax({
        url:"http://localhost:3000/categories",
        type:"get",
        contentType:"application/json",
        dataType:"json"
      }).done((data)=>{
        let lastItem=data.length-1;
        $('#categoriesOption').append(`<option>${data[lastItem].name.name}</option>`)
    })
    $('#categorySection').addClass('hidden');
}
