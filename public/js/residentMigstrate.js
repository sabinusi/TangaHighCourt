

$(document).ready(function () {

    var csrf = $("meta[name='csrf-token']").attr("content");

    var rm = []

    $.get('/allrm', (data, status) => {
        for (let index = 0; index < data.length; index++) {
            var ar = []
            ar.push(data[index].firstname)
            ar.push(data[index].lastname)
            ar.push(data[index].phone)
            ar.push(data[index].email)
            ar.push(data[index].gender)
            ar.push("<div style='display:flex'> <a class='btn btn-primary btn-xs' href='/residentMigstrate/edit/" + data[index]._id + "' >" +
                "<i class='fa fa-pencil'></i>" +
                "</a><span>" +
                "<form method='post', action='/residentMigstrate/delete/" + data[index]._id + "'>" +
                "<input type='hidden', name='_csrf', value=" + csrf + " />" +
                "<button type='submit' class='btn btn-danger btn-xs ml-2'>" +
                " <i class='fa fa-trash-o'></i>" +
                "</button>" +
                "</form></span ></div>")

            rm.push(ar)
            console.log("sasas", ar)
        }
        $('#example').DataTable({
            "dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
            // "dom": '<"toolbar">frtip',

            data: rm,
            columns: [
                { title: "firstname" },
                { title: "lastname" },
                { title: "phone" },
                { title: "email" },
                { title: "gender" },
                { title: "edit/delete" }

            ]
        });
        // $("div.dataTables_length")
        //     .html('<b>RESIDENT MIGSTRATE <button class="btn btn-success  fa fa-database" type="button", data-toggle="modal",data-target="#largerShoes">  ADD(RM) ' +
        //         '</button > </b > ');


    })
})
