var dataSet = [];

// var dataSet = [
//     ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
//     ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
// ];

$(document).ready(function () {

	var newarr3 = [];
	$('#example').DataTable({
		data: newarr3.push([]),
		"dom": '<"dt-buttons"Bf><"clear">lirtp',
		"paging": true,
		"autoWidth": true,
		"buttons": [
			'colvis',
			'copyHtml5',
			'csvHtml5',
			'excelHtml5',
			'pdfHtml5',
			'print'],
		"columns": [
			{ title: "email", "width": "5%" },
			{ title: "fullname", "width": "5%" },
			{ title: "domain_name", "width": "5%" },
			{ title: "location", "width": "5%" },
			{ title: "country", "width": "5%" },
			{ title: "title", "width": "5%" },
			{ title: "role", "width": "5%" },
			{ title: "seniority", "width": "5%" },
			{ title: "facebook", "width": "5%" },
			{ title: "twitter", "width": "5%" },
			{ title: "twitter_followers", "width": "3%" },
			{ title: "linkedin", "width": "3%" },
			{ title: "company", "width": "3%" }
		]
	});


	$("#submitbtn").click(function () {

		var newarr = [];
		var newarr2 = [];
		var domain_input = $('#exampleInputEmail1').val();
		if (domain_input === "" || domain_input === undefined) {
			alert("Please enter domain");
			return;
		}

		$.ajax({
			url: 'http://142.93.123.153:8080/api/getCompanyCustomerData?domain=' + domain_input,
			error: function () {
				console.log("Error occured.")
				alert("Error occured.")
			},
			success: function (data) {
				
				if (data.status === "Error") {
					console.log("Error in processing input :", data.Reason);
					alert("Error in processing input :" + data.Reason);
					return;
				}
				
				if (data.length === 0) {
					console.log("No records found", data);
					alert("No records found");
					return;
				}else{
					console.log("length of data=", data.length)
				}

				for (let i = 0; i < data.length; i++) {

					newarr= [];
					console.log("Email is : ", data[i].email)
					
					newarr.push(data[i].email)
					newarr.push(data[i].fullname)
					newarr.push(data[i].domain_name)
					newarr.push(data[i].location)
					newarr.push(data[i].country)
					newarr.push(data[i].title)
					newarr.push(data[i].role)
					newarr.push(data[i].seniority)
					newarr.push(data[i].facebook)
					newarr.push(data[i].twitter)
					newarr.push(data[i].twitter_followers)
					newarr.push(data[i].linkedin)
					newarr.push(data[i].company)
					newarr2.push(newarr);
				}


				datatable = $("#example").DataTable();
				datatable.clear();
				datatable.rows.add(newarr2);
				datatable.draw();
			},
			type: 'GET'
		});

		$('#ple').dataTable({
			bLengthChange: true,
			"sDom": 'Rlfrtlip',
		});

	});

});


