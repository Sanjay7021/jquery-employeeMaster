$(document).ready(function () {
  async function viewData() {
    var settings = {
      url: "https://gorest.co.in/public/v2/users",
      method: "GET",
      timeout: 0,
      headers: {
        Authorization:
          "Bearer 48b4785000cb75ddbe411d0867402540e11e054542201c388753ec38949402ab",
      },
    };

    $.ajax(settings).done(function (response) {
      // console.log(response);
      var data;
      var sortedData;
      // console.log($("#dropdown"));
      
      $("#dropdown").click(function sort1(){

        let dropdown_val = $("#dropdown").val();
        console.log(dropdown_val);
        if(dropdown_val.toString() == "Ascending"){
          console.log(response);

      
          sortedData = response.sort((a,b) =>  a.name.localeCompare(b.name));
         display(sortedData);
        }else if(dropdown_val == "Dscending"){
          sortedData = response.sort((a,b) =>  b.name.localeCompare(a.name));
          display(sortedData);
        }  else{
        sortedData = response;
       }
    
       display(sortedData);
      })
     
      
      display(response);

     
      $("button").click(function editFunc(e) {
        e.preventDefault();

        // $("#app").addClas("helloo");
        let btn = $(this).attr("id");
        // let btnClass = $(this).attr("class");
        console.log(btn);
        if (btn.includes("E")) {
          $("#app").removeClass("hidden");
          var splited_id = btn.split("E");
          var id = parseInt(splited_id[1]);
          // $("#app").attr("style","none")
          console.log("fired");
          console.log(id);
          $.each(response, function (key, value) {
            // console.log("all ids",value.id)variableRaj Godasa
            console.log(id);
            if (id == value.id) {
              console.log(value.id, value.name);
              var name = value.name;
              var id1 = value.id;
              var email = value.email;
              var gender = value.gender;
              $("#user_id").val(id1);
              $(".name").val(name);
              $(".email").val(email);
              $(".gender").val(gender);
            }
          });
        } else if (btn.includes("D")) {
          console.log("delete button clicked..");
          let splited_id = btn.split("D");
          let did = parseInt(splited_id[1]);
          // $("#app").attr("style","none")
          console.log("fired");
          console.log(did);
          $("#tableResult").html(" ");
          deleteData(did);
        }

        if (btn == "update") {


          // console.log($("#app").val());

          console.log("update button clicked...")
          // alert("Enter No")
          let id1 = $("#user_id").val();
          let name = $(".name").val();
          let gender = $(".gender").val();
          console.log("id from hidden", id1);
          // data = " ";?
          /* display: none; */
          $("#tableResult").html(" ");
          updateData(id1, name, gender);
        }
        /*
                if(btn  == "search"){
                  var input_search = $(".search_name").val();
                  // $.ajax(request).done(function (response) {
                  //   console.log("inside search api");
                  //   console.log(response)
                    $("#tableResult").html(" ");
                    var fetched_user;
                    $.each(response, function (key, value){
                      // console.log("variable"+input_search);
                      console.log(typeof value.name)
                      if(input_search.toString() == value.email){
                        var statusColor = value.status == "active" ? "green" : "red";
                        console.log("from if con"+value.name);
                         fetched_user = $(`<tr>
                        <th scope="row">${value.name}</th>
                        <td>${value.email}</td>
                        <td>${value.gender}</td>
                        <td style=color:${statusColor}>${value.status}</td>
                        <td><button class="btn btn-primary" id=E${value.id}>EDIT</button> || <button class="btn btn-danger" id=D${value.id}>DELETE</button></td>
                      </tr>`);
                      $("#tableResult").append(fetched_user);
                      }
                      // console.log(value.name)
                    })
                    
                    // console.log(fetched_user);
                  // })
                }
        */

      });
    });
  }
  viewData();

  //create user
  $("#create").click(function create(e) {
    // let radio = $("")
    e.preventDefault();
    let gender = $("input[type='radio'][name='gen']:checked");
    let status = $("input[type='radio'][name='status']:checked");
    let name = $(".create_name").val();
    let email = $(".create_email").val();
    // console.log(gender.val());
    // console.log(status.val());
    // console.log(name,email);
    let data = {
      name: name,
      email: email,
      gender: gender.val(),
      status: status.val(),
    }
    console.log(data);
    $("#tableResult").html(" ");
    createUser(data);
  })


  $("#show").click(function remove() {
    $("#app1").removeClass("hidden");
  })

  function createUser(newData) {
    // var object = {
    //   name: "Nikkhil",
    //   email: "ooo@radix.com",
    //   gender: "male",
    //   status: "active",
    // };

    var settings = {
      url: `https://gorest.co.in/public/v2/users`,
      method: "POST",
      timeout: 0,
      headers: {
        Authorization:
          "Bearer 48b4785000cb75ddbe411d0867402540e11e054542201c388753ec38949402ab",
      },
      data: newData,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      console.log("data inserted");
      viewData();
    });
  }

  // postData();

  function updateData(id, name, gender) {
    // var id = 6796924;
    // var name = "sanjay..";
    console.log(id, name, gender)
    var settings = {
      url: `https://gorest.co.in/public/v2/users/${id}?name=${name}&&gender=${gender}`,
      method: "PATCH",
      timeout: 0,
      headers: {
        Authorization:
          "Bearer 48b4785000cb75ddbe411d0867402540e11e054542201c388753ec38949402ab",
      },
    };

    $.ajax(settings).done(function (response) {
      $(".body").append();
      console.log(response);
      console.log("updated");
      viewData();

    });
  }

  // updateData();

  function deleteData(id) {
    console.log("from the delete fun", id);
    // var id = 6793023;
    var settings = {
      url: `https://gorest.co.in/public/v2/users/${id}`,
      method: "DELETE",
      timeout: 0,
      headers: {
        Authorization:
          "Bearer 48b4785000cb75ddbe411d0867402540e11e054542201c388753ec38949402ab",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      console.log("dleleted");
      viewData();
    });
  }

  // deleteData();


  $("#remove").click(function remove() {
    $("#app").addClass("hidden")
    // $("#app").attr("class","hidden");
  })
  $("#create_remove").click(function remove() {
    $("#app1").addClass("hidden")
    // $("#app").attr("class","hidden");
  })




  //additional search functionality...
  $(".search").click(function search(e) {
    e.preventDefault();
    var input_search = $(".search_name").val();
    console.log(input_search);

    var request = {
      url: "https://gorest.co.in/public/v2/users",
      method: "GET",
      timeout: 0,
      headers: {
        Authorization:
          "Bearer 48b4785000cb75ddbe411d0867402540e11e054542201c388753ec38949402ab",
      },
    };

    $.ajax(request).done(function (response) {
      console.log("inside search api");
      console.log(response)
      $("#tableResult").html(" ");
      var fetched_user;
      $.each(response, function (key, value) {
        // console.log("variable"+input_search);
        console.log(typeof value.name)
        if (input_search.toString() == value.email) {
          var statusColor = value.status == "active" ? "green" : "red";
          console.log("from if con" + value.name);
          fetched_user = $(`<tr>
          <th scope="row">${value.name}</th>
          <td>${value.email}</td>
          <td>${value.gender}</td>
          <td style=color:${statusColor}>${value.status}</td>
          <td><button class="btn btn-primary edit1" id=E${value.id}>EDIT</button> || <button class="btn btn-danger delete-" id=D${value.id}>DELETE</button></td>
        </tr>`);
          $("#tableResult").append(fetched_user);
        }
        // console.log(value.name)
      })
      // console.log(fetched_user);
      $(".edit1").click(function edit() {
        let btn = $(".edit1").attr("id");
        $("#app").removeClass("hidden");
        var splited_id = btn.split("E");
        var id = parseInt(splited_id[1]);
        // $("#app").attr("style","none")
        console.log("fired");
        console.log(id);
        $.each(response, function (key, value) {
          // console.log("all ids",value.id)variableRaj Godasa
          console.log(id);
          if (id == value.id) {
            console.log(value.id, value.name);
            var name = value.name;
            var id1 = value.id;
            var email = value.email;
            var gender = value.gender;
            $("#user_id").val(id1);
            $(".name").val(name);
            $(".email").val(email);
            $(".gender").val(gender);
          }
        })
      })
        $(".delete-").click(function edit() {
          let btn = $(".delete-").attr("id");
          let splited_id = btn.split("D");
          let did = parseInt(splited_id[1]);
          // $("#app").attr("style","none")
          console.log("fired");
          console.log(did);
          $("#tableResult").html(" ");
          deleteData(did);
        })
      })



    })


    function display(sortedData){
      $("#tableResult").html(" ");
      $.each(sortedData, function (key, value) {
        var statusColor = value.status == "active" ? "green" : "red";
        data = $(`
          <tr>
            <th scope="row">${value.name}</th>
            <td>${value.email}</td>
            <td>${value.gender}</td>
            <td style=color:${statusColor}>${value.status}</td>
            <td><button class="btn btn-primary" id=E${value.id}>EDIT</button> || <button class="btn btn-danger" id=D${value.id}>DELETE</button></td>
          </tr>
        `);
        $("#tableResult").append(data);
      });
    }
  });




// for get request simply copy the code and you will find the onbject
//for post request you have to create one object and pass in the data attribute of agax value.
//for patch request you have to give your data into the vribale and pass the those variable to data url corresponding key value.
//for delete we have to provide id into the url itself using variable..
