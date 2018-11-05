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
			{ title: "domain", "width": "5%" },
			{ title: "country", "width": "5%" },
			{ title: "alexa", "width": "5%" },
			{ title: "industry", "width": "5%" },
			{ title: "indGroup", "width": "5%" },
			{ title: "sector", "width": "5%" },
			{ title: "linkedin", "width": "5%" },
			{ title: "fb", "width": "5%" },
			{ title: "fb_likes", "width": "5%" },
			{ title: "twitter", "width": "5%" },
			{ title: "Tw_follow", "width": "3%" },
			{ title: "gmail", "width": "3%" },
			{ title: "hotmail", "width": "3%" },
			{ title: "yahoo", "width": "3%" },
			{ title: "employees", "width": "3%" },
			{ title: "empRange", "width": "3%" },
			{ title: "estimatedAnnualRev", "width": "3%" }
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
			url: 'http://142.93.123.153:8080/api/getCompanyData?domain=' + domain_input,
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
				}

				var gmail_index = "";
				var yahoo_index = "";
				var hotmail_index = "";

				if (data[0].gmail === "Not Available") {
					gmail_index = "Not Available"
				} else if (data[0].gmail === "Too many requests from IP") {
					gmail_index = "Too many requests from IP"
				}else {
					gmail_index = (Math.round(data[0].gmail * 100) / 100) + ""
				}

				if (data[0].yahoo === "Not Available") {
					yahoo_index = "Not Available"
				} else if (data[0].yahoo === "Too many requests from IP") {
					yahoo_index = "Too many requests from IP"
				} else {
					yahoo_index = (Math.round(data[0].yahoo * 100) / 100) + ""
				}

				if (data[0].hotmail === "Not Available") {
					hotmail_index = "Not Available"
				} else if (data[0].hotmail === "Too many requests from IP") {
					hotmail_index = "Too many requests from IP"
				} else {
					hotmail_index = (Math.round(data[0].hotmail * 100) / 100) + ""
				}

				newarr.push(data[0].domain_name)
				newarr.push(data[0].country)
				newarr.push(data[0].alexaRank)
				newarr.push(data[0].industry)
				newarr.push(data[0].industryGroup)
				newarr.push(data[0].sector)
				// newarr.push(data[0].tech_stack)
				newarr.push(data[0].linkedin)
				newarr.push(data[0].facebook)
				newarr.push(data[0].facebook_likes)
				newarr.push(data[0].twitter)
				newarr.push(data[0].twitter_followers)
				newarr.push(gmail_index)
				newarr.push(hotmail_index)
				newarr.push(yahoo_index)
				newarr.push(data[0].employees)
				newarr.push(data[0].employeesRange)
				newarr.push(data[0].estimatedAnnualRevenue)
				newarr2.push(newarr);

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


