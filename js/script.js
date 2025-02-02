// Load data from JSON file
let data = {
  officers: [],
  updates: [],
  users: []
};

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    loadOfficers();
    loadUpdates();
  })
  .catch(error => console.error('Error loading JSON:', error));

// Load officers into the admin panel
function loadOfficers() {
  const officerList = document.getElementById('officer-list');
  officerList.innerHTML = '';
  data.officers.forEach(officer => {
    officerList.innerHTML += `
      <div>
        <strong>${officer.name}</strong> - ${officer.phone_number} (${officer.designation})
        <button onclick="deleteOfficer(${officer.id})">Delete</button>
      </div>
    `;
  });
}

// Load updates into the home page
function loadUpdates() {
  const updatesList = document.getElementById('updates-list');
  updatesList.innerHTML = '';
  data.updates.forEach(update => {
    updatesList.innerHTML += `
      <div>
        <h3>${update.title}</h3>
        <p>${update.content}</p>
        <small>${update.post_date}</small>
      </div>
    `;
  });
}

// Search for officers
function searchOfficer() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const results = data.officers.filter(officer =>
    officer.name.toLowerCase().includes(query) ||
    officer.phone_number.includes(query)
  );
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';
  if (results.length > 0) {
    results.forEach(officer => {
      searchResults.innerHTML += `
        <div>
          <strong>${officer.name}</strong> - ${officer.phone_number} (${officer.designation})
        </div>
      `;
    });
  } else {
    searchResults.innerHTML = '<p>No results found.</p>';
  }
}

// Add a new officer
document.getElementById('add-officer-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('officer-name').value;
  const phone = document.getElementById('officer-phone').value;
  const designation = document.getElementById('officer-designation').value;
  const newOfficer = {
    id: data.officers.length + 1,
    name,
    phone_number: phone,
    designation
  };
  data.officers.push(newOfficer);
  loadOfficers();
});

// Post a new update
document.getElementById('update-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('update-title').value;
  const content = document.getElementById('update-content').value;
  const newUpdate = {
    id: data.updates.length + 1,
    title,
    content,
    post_date: new Date().toISOString().split('T')[0]
  };
  data.updates.push(newUpdate);
  loadUpdates();
});

// Delete an officer
function deleteOfficer(id) {
  data.officers = data.officers.filter(officer => officer.id !== id);
  loadOfficers();
}