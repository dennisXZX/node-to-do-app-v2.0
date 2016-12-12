$(document).ready(function(){

  // handle the to-do item addition
  $('form').on('submit', function(){

      var item = $('#item');
      var todo = {"item": item.val()};

      // fire a POST request and send out an object
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          location.reload();
        }
      });

      return false;

  });

  // handle the to-do item delete
  $('li').on('click', function(){

      let item = $(this).text();
      
      // fire a DELETE request and attach the item text to the url
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          location.reload();
        }
      });
  });

});
