

$(document).ready(function () {

    var rm = []
    var csrf = $("meta[name='csrf-token']").attr("content");

    $.get('/case/allCases', (data, status) => {
        for (let index = 0; index < data.length; index++) {
            var ar = []
            ar.push(data[index].name)
            ar.push(data[index].filenumber)
            ar.push(data[index].openDate)
            ar.push(data[index].closedDate)
            ar.push(data[index].judge.firstname + " " + data[index].judge.lastname)
            ar.push(data[index].recordManagementAssistance.firstname + ' ' + data[index].recordManagementAssistance.lastname)
            ar.push(data[index].residentMigstrate.firstname + ' ' + data[index].residentMigstrate.lastname)
            ar.push("<div style='display:flex'> <a class='btn btn-primary btn-xs' href='/" + data[index]._id + "' >" +
                "<i class='fa fa-pencil'></i>" +
                "</a><span>" +
                "<form method='post', action='/case/delete/" + data[index]._id + "'>" +
                "<input type='hidden', name='_csrf', value=" + csrf + " />" +
                "<button type='submit' class='btn btn-danger btn-xs ml-2'>" +
                " <i class='fa fa-trash-o'></i>" +
                "</button>" +
                "</form></span ></div>")
            console.log(data[index].judge)
            console.log(data[index].judge.firstname)

            rm.push(ar)

        }
        $('#example').DataTable({
            "dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
            // "dom": '<"toolbar">frtip',
            data: rm,
            columns: [
                { title: "name" },
                { title: "filenumber" },
                { title: "opendate" },
                { title: "closeddate" },
                { title: "judge" },
                { title: "record management assistant" },
                { title: "resident migstrate" },
                { title: "edit/delete" }

            ]
        });
        // $("div.dataTables_length")
        //     .html('<b>RESIDENT MIGSTRATE <button class="btn btn-success  fa fa-database" type="button", data-toggle="modal",data-target="#largerShoes">  ADD(RM) ' +
        //         '</button > </b > ');


    })
    // make anautocomplete





})