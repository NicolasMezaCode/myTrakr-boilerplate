let newCategory=(value)=>{
    $.ajax({
        url:"https://final-proyect-trackr.herokuapp.com/categories",
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
        url:"https://final-proyect-trackr.herokuapp.com/categories",
        type:"get",
        contentType:"application/json",
        dataType:"json"
      }).done((data)=>{
        let lastItem=data.length-1;
        $('#categoriesOption').append(`<option>${data[lastItem].name.name}</option>`)
    })
    $('#categorySection').addClass('hidden');
}
