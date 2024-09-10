// script.js
$(document).ready(function () {
	function buildApiUrl() {
		const baseUrl = 'https://randomuser.me/api/';
		let selectedFields = [];
		let numResults = $('#numResults').val(); // Get the number of results from the input field

		$('#dataSelectionForm input[type=checkbox]:checked').each(function () {
			selectedFields.push($(this).attr('name'));
		});

		if (selectedFields.length > 0) {
			return `${baseUrl}?inc=${selectedFields.join(',')}&results=${numResults}`;
		} else {
			return `${baseUrl}?results=${numResults}`;
		}
	}

	function displayUsers(users) {
		$('#userData').empty(); // Clear previous data
		users.forEach((user) => {
			let userHtml = `
                <div class="user-card">
                    <h3>${user.name.first} ${user.name.last}</h3>
					${user.picture
					? `<img src="${user.picture.medium}" alt="User picture" />`
					: ''
				}
					${user.nat
					? `<p><strong>Nationality:</strong> ${user.nat}</p>`
					: ''
				}
                    ${user.gender
					? `<p><strong>Gender:</strong> ${user.gender}</p>`
					: ''
				}
                    ${user.email
					? `<p><strong>Email:</strong> ${user.email}</p>`
					: ''
				}
                    ${user.location
					? `<p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>`
					: ''
				}
                    ${user.phone
					? `<p><strong>Phone:</strong> ${user.phone}</p>`
					: ''
				}
                    ${user.cell
					? `<p><strong>Cell:</strong> ${user.cell}</p>`
					: ''
				}
                    ${user.dob
					? `<p><strong>Date of Birth:</strong> ${user.dob.date}</p>`
					: ''
				}
                    ${user.id
					? `<p><strong>ID:</strong> ${user.id.value}</p>`
					: ''
				}
                    ${user.login
					? `<p><strong>Login:</strong> ${user.login.username}</p>`
					: ''
				}
                    ${user.registered
					? `<p><strong>Registered:</strong> ${user.registered.date}</p>`
					: ''
				}
                    
                </div>
            `;
			$('#userData').append(userHtml);
		});
	}

	$('#dataSelectionForm').on('submit', function (event) {
		event.preventDefault(); // Prevent the form from submitting the traditional way
		$('.loading').show(); // Show loading indicator

		const apiUrl = buildApiUrl();

		$.ajax({
			url: apiUrl,
			method: 'GET',
			dataType: 'json',
			success: function (response) {
				displayUsers(response.results);
				$('.loading').hide(); // Hide loading indicator
			},
			error: function () {
				$('#userData').html('<p>Error fetching data.</p>');
				$('.loading').hide(); // Hide loading indicator
			},
		});
	});

	// Initialize the URL on page load (if needed)
	buildApiUrl();
});
