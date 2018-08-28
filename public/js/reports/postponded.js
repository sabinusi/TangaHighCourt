$(document).ready(function () {
    var rm = []
    var table = $('#example').DataTable({
        "dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
        // "dom": '<"toolbar">frtip',
        data: rm,
        buttons: ['copy', 'excel', 'pdf', 'colvis'],
        columns: [
            { title: "Filenumber" },
            { title: "Opendate" },
            { title: "Closeddate" },
            { title: "Hearingdate" },
            { title: "Room number" },
            { title: "Judge" },
            { title: "Record management assistancce" },
            { title: "Resident migstry" }

        ]

    });
    table.buttons().container()
        .insertBefore('#example_filter');


});